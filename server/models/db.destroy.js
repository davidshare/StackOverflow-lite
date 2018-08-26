const answersDestroy = 'DROP TABLE IF EXISTS answers; ';
const questionsDestroy = 'DROP TABLE IF EXISTS questions; ';
const usersDestroy = 'DROP TABLE IF EXISTS users; ';

const destroyQuery = `${answersDestroy}${questionsDestroy}${usersDestroy}`;

export default destroyQuery;