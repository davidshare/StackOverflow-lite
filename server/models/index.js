import dotenv from 'dotenv';
import { Client } from 'pg';
import setup from '../config/config';
import createQuery from 'db.create';
import populateQuery from 'db.populate';

dotenv.config();
let config;
if (process.env.NODE_ENV === 'development') {
  config = setup.development;
} else if (process.env.NODE_ENV === 'test') {
  config = setup.test;
} else {
  config = process.env.DATABASE_URL;
}

const client = new Client(config);
client.connect();
client.query(queries, (error) => {
  console.log(error);
  client.end();
});
