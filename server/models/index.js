import createQuery from './db.create';
import populateQuery from './db.populate';
import destroyQuery from './db.destroy';
import client from '../helpers/conn';



const dbQueries = `${destroyQuery}${createQuery}${populateQuery}`;

client.query(dbQueries)
  .then((dbResponse) => {
    if(dbResponse){
      return dbResponse;
    }
  }).catch((error) =>{
    return error;
  });