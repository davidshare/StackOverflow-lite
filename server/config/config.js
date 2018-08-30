import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    dbUser: process.env.DB_USER,
    dbPaswd: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DB_DIALECT,
    secretKey: process.env.SECRET_KEY,
  },
  test: {
    dbUser: process.env.DB_USER,
    dbPaswd: process.env.DB_PASS,
    dbName: process.env.DB_TEST_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DB_DIALECT,
    secretKey: process.env.SECRET_KEY,
  },
  production: {
    dbUrl: process.env.DB_URL,
  },
};
