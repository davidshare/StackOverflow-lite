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
   *   *
   * @return {boolean}
   */
  static checkDuplicateEmail(email) {
    const query = `SELECT * FROM users WHERE email ='${email}'`;

    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return false;
        }
        return true;
      })
      .catch(error => error.stack);
  }

  /**
   * check if user email already exists
   * @param {String} username
   *   *
   * @return {boolean}
   */
  static checkDuplicateUsername(username) {
    const query = `SELECT * FROM users WHERE username ='${username}'`;

    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return false;
        }
        return true;
      })
      .catch(error => error.stack);
  }
}

export default CheckDuplicates;
