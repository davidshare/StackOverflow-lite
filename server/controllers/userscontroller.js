import client from '../helpers/conn';
import passwordHelper from '../helpers/password';
import generateToken from '../helpers/token';

/**
 * @class User Controller
 */

class UserController {

  /**
   *  Creater user account
   *  @param {Object} requestuest
   *  @param {Object} response
   *
   *
   *  @return {Object} json
   */

  static signUp(request, response) {
    client.connect();
    const userPass = passwordHelper.passwordHash(request.body.passwd.trim());
    const query = {
      text: 'INSERT INTO users(fullname, username, email, passwd) VALUES ($1, $2, $3, $4)',
      values: [ request.body.fullname, request.body.username, request.body.email, userPass ],
    }
    client.query(query, (error, dbResponse) => {
      if (error) {
        return response.status(500).json({
          status: 'Failed',
          message: 'Could not create account!',
          error: error.stack,
        });
      }
      const token = generateToken(dbResponse.rows[0]);
      return response.status(200).json({
        status: 'Success',
        message: 'Acount created successfully',
        token,
      });
      client.end();
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
    const { username, passwd, } = request.body;
    const userQuery = `SELECT * FROM users WHERE username = '${ username }'`;
    client.connect();
    client.query(userQuery, (error, dbResponse) => {
      if(error){
        return response.status(404).json({
         status: 'fail',
         message: 'Sorry could not login',
         error: error.stack,
        });
      } else {
        if (!dbResponse.rows[0] || !passwordHelper.comparePasswords(passwd.trim(), dbResponse.rows[0].passwd)) {
          return response.status(401).json({
            message: 'Your username and password do not match!',
            status: 'fail',
          });
        }
        const token = generateToken(dbResponse.rows[0].id);
        return response.status(201).json({
          status: 'Success',
          message: 'You have been logged in successfully!',
          token,
        });
      }
    });
  }

}

export default UserController;
