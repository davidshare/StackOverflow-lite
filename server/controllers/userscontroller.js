import { client } from 'pg';
import { config } from '../helpers/conn';

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
    client.query(
      'INSERT INTO users(fullname, username, email, password) VALUES ($1, $2, $3, $4)', 
      [
        request.body.fullname, request.body.username, request.body.email, request.body.paswd
      ]
    );
    return response.status(200).json({
      status: 'Success',
      message: 'Acount created successfully',
      questions,
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

    client.query(
      'INSERT INTO users(fullname, username, email, passwd) VALUES ($1, $2, $3, $4)', 
      [
        request.body.fullname, request.body.username, request.body.email, request.body.paswd
      ]
    );
    return response.status(200).json({
       status: 'Success',
       message: 'Acount created successfully',
    });
  }
}

export default UserController;
