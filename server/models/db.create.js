const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY,
    fullname VARCHAR (100) NOT NULL,
    username VARCHAR (15) NOT NULL,
    email VARCHAR(30) NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT TIMESTAMP,
    updated TIMESTAMP
  );
`;

const createQuestionsTable = `
  CREATE TABLE IF NOT EXISTS questions(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR (55) NOT NULL,
    description VARCHAR (550) NOT NULL,
    userid INT NOT NULL REFERENCES users(id),
    status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT TIMESTAMP,
    views INT DEFAULT 0,
    updated TIMESTAMP,
    active TIMESTAMP
  );
`;

const createAnswersTable = `
  CREATE TABLE IF NOT EXISTS answers(
    id BIGSERIAL PRIMARY KEY,
    answer VARCHAR (550) NOT NULL,
    userid INT NOT NULL REFERENCES users(id),
    questionid BIGSERIAL NOT NULL REFERENCES questions(id),,
    status BOOLEAN DEFAULT false,
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT TIMESTAMP,
    views INT DEFAULT 0,
    updated TIMESTAMP,
    active TIMESTAMP,
  );
`;

const createQuery = `${createUsersTable}${createQuestionsTable}${createAnswersTable}`;

export default createQuery;