import client from '../helpers/conn';
import generateToken from '../helpers/token';

client.connect();

class QuestionController {
  static askQuestion(request, response) {
    const {
      title,
      description,
      userid,
    } = request.body;
   const query = {
      text: 'INSERT INTO questions(title, description, userid) VALUES ($1, $2, $3)',
      values: [ request.body.title, request.body.description, request.body.userid],
    }

    client.query(query)
      .then((dbResult) => {
        if(dbResult.rowCount === 0){
           return response.status(500).json({
            status: 'Failed',
            message: 'Sorry your question could not be posted.',
          });
        }
        return response.status(200).json({
          status: 'Success',
          message: 'Question successfully posted',
        });
      })
      .catch((error) =>{
        response.status(500).send({
          error: error.stack,
        });
      });
  }

  // get all questions
  static getAllQuestions(request, response) {
    const query = "SELECT * from questions";

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            status: 'Failed',
            message: 'Could not get questions',
          });
        }else{
          return response.status(200).json({
            status: 'Success',
            message: 'Successfully got all questions',
            questions: dbResult.rows,
          });
        }
      })
      .catch((error) =>{
         response.status(500).send({
          error: error.stack,
        });
      });
  }

  static getQuestionById(request, response) {
    const id = parseInt(request.params.id, 10);
    const query = `SELECT * from questions WHERE id = ${id}`;
    client.query(query)
    .then((dbResult) => {
      if(!dbResult.rows[0]){
        return response.status(404).json({
          status: 'Failed',
          message: 'Question not found!',
        });
      }else{
        return response.status(200).json({
          status: 'Success',
          message: 'Question successfully retrieved!',
          question: dbResult.rows[0],
        });
      }
    })
    .catch((error) =>{
      console.log(error.stack);
      response.status(500).send({
        error: error.stack,
      });
    });
  }

  static deleteQuestionById(request, response){

    const id = parseInt(request.params.id, 10);
    const query = `DELETE FROM questions WHERE id = ${ id }`;

    client.query(query)
      .then((dbResult) => {
        if(dbResult.rowCount === 0){
          return response.status(500).json({
            status: 'Fail',
            message: 'Question could not be deleted or it does not exist',
            questionError,
          });
        } else {
          return response.status(200).json({
            status: 'Success',
            message: 'Question successfully deleted!',
          });
        }
      })
      .catch((error) => {
        response.status(500).send({
          error: error.stack,
        });
      });
  }
}

export default QuestionController;
