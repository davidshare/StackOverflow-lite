import client from '../helpers/conn';
import generateToken from '../helpers/token';

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
    client.connect();
    client.query(query, (error, dbResponse) => {
      if (error) {
        return response.status(500).json({
          status: 'Failed',
          message: 'Could not post your question',
          error: error.stack,
        });
      }
      const token = generateToken(dbResponse.rows[0]);
    return response.status(200).json({
      status: 'Success',
      message: 'Qestion successfully posted',
      token,
    });
  });
}

  // get all questions
  static getAllQuestions(request, response) {
    const query = "SELECT * from questions";
    client.connect();
    client.query(query, (error, dbResponse) => {
      if (error) {
        return response.status(500).json({
          status: 'Failed',
          message: 'Could not get questions',
          error: error.stack,
        });
      }
    return response.status(200).json({
      status: 'Success',
      message: 'Successfully got all questions',
      questions: dbResponse.rows,
    });
  });
}

  // get question by id
  static getQuestionById(request, response) {
    // get the id from the request object and convert it to an integer
    const id = parseInt(request.params.id, 10);

    const query = `SELECT * from questions WHERE id = ${id}`;
    client.connect();
    client.query(query, (error, dbResponse) => {
      if (error) {
        return response.status(500).json({
          status: 'Fail',
          message: 'Question not found!',
          error: error.stack,
        });
      }
    if(!dbResponse.rows[0]){
      return response.status(200).json({
        status: 'Fail',
        message: 'Question not found!',
        question: dbResponse.rows[0],
      });
    }
    return response.status(200).json({
      status: 'Success',
      message: 'Question successfully retrieved!',
      question: dbResponse.rows[0],
    });
  });
  }
}

export default QuestionController;
