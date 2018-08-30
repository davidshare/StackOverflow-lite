import connection from '../helpers/conn';
import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';

const client = connection();
client.connect();

/**
 * @class User Controller
 */

class UserController {
  /**
   *  Creater user account
   *  @param {Object} request
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */

  static signUp(request, response) {
    const {
      fullname, username, email, password,
    } = request.body;
    if (fullname && username && email && password) {
      const userPassword = passwordHelper.passwordHash(password.trim());
      const query = {
        text: 'INSERT INTO users(fullname, username, email, password) VALUES ($1, $2, $3, $4)',
        values: [fullname, username, email, userPassword],
      };
      client.query(query)
        .then((dbResult) => {
          if (dbResult.rowCount === 0) {
            return response.status(406).json({
              status: 406,
              success: false,
              error: 'Could not create account!',
            });
          }
          const currentToken = generateToken(request.body);
          return response.status(201).json({
            status: 201,
            success: true,
            message: 'Acount created successfully',
            user: dbResult.rows[0],
            token: currentToken,
          });
        })
        .catch((error) => {
          response.status(406).send({
            status: 406,
            success: false,
            error: error.stack,
          });
        });
    }
  }


  /**
   *  Sign in user
   *  @param {Object} requestuest
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */
  static signIn(request, response) {
    const { username, password } = request.body;
    if (username && password) {
      const query = `SELECT * FROM users WHERE username = '${username}'`;
      client.query(query)
        .then((dbResult) => {
          if (dbResult === 0) {
            return response.status(500).json({
              status: 500,
              success: false,
              error: 'Sorry could not login',
            });
          }
          if (!dbResult.rows[0] || !passwordHelper.comparePasswords(password.trim(),
            dbResult.rows[0].password)) {
            return response.status(401).json({
              status: 401,
              success: false,
              error: 'Either your username or your password is incorrect! Enter a correct username and password',
            });
          }

          const token = generateToken(dbResult.rows[0]);
          process.env.CURRENT_TOKEN = token;
          return response.status(201).json({
            status: 200,
            success: true,
            message: 'You have been logged in successfully!',
            token,
          });
        })
        .catch((error) => {
          response.status(500).send({
            status: 500,
            success: false,
            error: error.stack,
          });
        });
    }
  }
}

export default UserController;
