import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const secretKey = config.development.secretKey;

/**
 * @class Authenticate User
 */
class UserAuthentication {
  /**
     * Authenticate users
     *
     * @param {Object} request
     * @param {Object} response
     *
     * @param {callback} next
     *
     * @return {Object}
     */
  static authenticateUser(request, response, next){
    const userToken = request.body.token || request.query.token || request.headers['x-access-token'];
    if(userToken){
      jwt.verify(userToken, secretKey, (error, data) => {
        if(error){
          return response.json({ 
            success: false, 
            message: 'Authentication failed!',
          });
        } else {
          request.data = data;
          return next();
        }
      });
    } else {
      return response.status(403).json({ 
        success: false, 
        message: 'Sorry, you are not permitted to come here.',
      });
    }
  }
}

export default UserAuthentication;
