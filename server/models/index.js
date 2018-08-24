import dotenv from 'dotenv';
import { Client } from 'pg';
import setup from '../config/config';
import createQuery from './db.create';
import populateQuery from './db.populate';
import destroyQuery from './db.destroy';

dotenv.config();
let config;
if (process.env.NODE_ENV === 'development') {
  config = setup.development;
} else if (process.env.NODE_ENV === 'test') {
  config = setup.test;
} else {
  config = process.env.DATABASE_URL;
}

const dbQueries = `${destroyQuery}${createQuery}${populateQuery}`

const client = new Client(config);
client.connect();
client.query(dbQueries, (error) => {
  console.log(error);
  client.end();
});
