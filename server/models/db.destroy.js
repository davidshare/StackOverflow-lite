const votesDestroy = 'DROP TABLE IF EXISTS votes CASCADE; ';
const answersDestroy = 'DROP TABLE IF EXISTS answers CASCADE; ';
const questionsDestroy = 'DROP TABLE IF EXISTS questions CASCADE; ';
const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';

const destroyQuery = `${votesDestroy}${answersDestroy}${questionsDestroy}${usersDestroy}`;

export default destroyQuery;
