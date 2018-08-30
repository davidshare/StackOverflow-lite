import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const { secretKey } = config.development;

const expirationTime = 60 * 60 * 24;

const generateToken = userObject => jwt.sign({ user: userObject.user }, secretKey,
  {
    expiresIn: expirationTime,
  });

export default generateToken;
