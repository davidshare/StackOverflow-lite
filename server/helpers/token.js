import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const { secretKey } = config.development.secretKey;
const expirationTime = 60 * 60 * 24;

const generateToken = (request, response) => {
  jwt.sign({ user: response.user }, secretKey, { expiresIn: expirationTime },
    (error, token) => {
      response.json({
        token,
      });
    });
};

export default generateToken;
