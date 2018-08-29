import client from '../helpers/conn';
import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';

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
      fullname, username, email, passwd,
    } = request.body;
    const userPass = passwordHelper.passwordHash(passwd.trim());
    const query = {
      text: 'INSERT INTO users(fullname, username, email, passwd) VALUES ($1, $2, $3, $4)',
      values: [fullname, username, email, userPass],
    };
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(500).json({
            status: 'Failed',
            message: 'Could not create account!',
          });
        }
        return response.status(200).json({
          status: 'Success',
          message: 'Acount created successfully',
        });
      })
      .catch((error) => {
        response.status(500).send({
          error: error.stack,
        });
      });
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
    const { username, passwd } = request.body;
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    client.query(query)
      .then((dbResult) => {
        if (dbResult === 0) {
          return response.status(500).json({
            status: 'fail',
            message: 'Sorry could not login',
          });
        }
        if (!dbResult.rows[0] || !passwordHelper.comparePasswords(passwd.trim(),
          dbResult.rows[0].passwd)) {
          return response.status(401).json({
            message: 'Your username and password do not match!',
            status: 'fail',
          });
        }

        const token = generateToken(dbResult.rows[0]);
        return response.status(201).json({
          status: 'Success',
          message: 'You have been logged in successfully!',
          token,
        });
      })
      .catch((error) => {
        response.status(500).send({
          error: error.stack,
        });
      });
  }
}

export default UserController;
