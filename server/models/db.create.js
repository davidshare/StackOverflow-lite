const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id BIGSERIAL PRIMARY KEY,
    fullname VARCHAR (100) NOT NULL,
    username VARCHAR (15) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    passwd VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP
  );
`;

const createQuestionsTable = `
  CREATE TABLE IF NOT EXISTS questions(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR (100) NOT NULL,
    description TEXT NOT NULL,
    userid BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    answer INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    num_views INT DEFAULT 0,
    updated TIMESTAMP,
    active TIMESTAMP
  );
`;

const createAnswersTable = `
  CREATE TABLE IF NOT EXISTS answers(
    id BIGSERIAL PRIMARY KEY,
    answer TEXT NOT NULL,
    userid BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    questionid BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP,
    active TIMESTAMP
  );
`;

const createVotesTable = `
  CREATE TABLE IF NOT EXISTS votes(
    id BIGSERIAL PRIMARY KEY,
    answerId BIGINT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vote INT NOT NULL DEFAULT 0,
    active TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createQuery = `${createUsersTable} ${createQuestionsTable} ${createAnswersTable} ${createVotesTable}`;

export default createQuery;
