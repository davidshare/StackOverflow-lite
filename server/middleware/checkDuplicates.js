import connection from '../helpers/conn';

const client = connection();
client.connect();
/**
 * @class Check Duplicates
 */
class CheckDuplicates {
  /**
   * check if user email already exists
   * @param {String} email
   *
   * @return {boolean}
   */
  static checkDuplicateEmail(request, response, next) {
    if (request.email) {
      const query = `SELECT * FROM users WHERE email ='${request.email}'`;

      client.query(query)
        .then((dbResult) => {
          if (dbResult.rows[0]) {
            return response.status(406)
              .json({
                statusCode: 406,
                message: 'Sorry this email is taken',
                success: 'fail',
              });
          }
          return next();
        }).catch((err) => { response.status(500).send(err.message); });
    }
  }

  /**
   * check if user email already exists
   * @param {String} username
   *   *
   * @return {boolean}
   */
  static checkDuplicateUser(request, response, next) {
    if (request.username) {
      const query = `SELECT * FROM users WHERE username ='${request.username}'`;

      client.query(query)
        .then((dbResult) => {
          if (dbResult.rows[0]) {
            return response.status(406)
              .json({
                statusCode: 406,
                message: 'Sorry this username has already been registered',
                success: 'fail',
              });
          }
          return next();
        }).catch((err) => { response.status(500).send(err.message); });
    }
  }
}

export default CheckDuplicates;
