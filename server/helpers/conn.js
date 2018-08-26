import { Client } from 'pg';
import setup from '../config/config';
import dotenv from 'dotenv';

dotenv.config();
let config;
if (process.env.NODE_ENV === 'development') {
  config = setup.development;
} else if (process.env.NODE_ENV === 'test') {
  config = setup.test;
} else {
  config = process.env.DB_URL;
}

const client = new Client(config);

export default client;