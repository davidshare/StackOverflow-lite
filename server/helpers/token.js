import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const secretKey = config.development.secretKey;
const expirationTime = 60*60*24;

const generateToken = id =>  jwt.sign( { id }, secretKey, { expiresIn: expirationTime },);

export default generateToken;
