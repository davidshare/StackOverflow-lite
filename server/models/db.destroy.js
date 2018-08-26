const answersDestroy = 'DROP TABLE IF EXISTS answers';
const questionsDestroy = 'DROP TABLE IF EXISTS questions';
const usersDestroy = 'DROP TABLE IF EXISTS users';
const dbDestroy = 'DROP DATABASE IF EXISTS stacklite';

const destroyQuery = `${answersDestroy}${questionsDestroy}${usersDestroy}${dbDestroy}`;

export default destroyQuery;