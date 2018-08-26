import client from '../helpers/conn';
import generateToken from '../helpers/token';

class AnswerController {
  // Method to post user question
  static answerQuestion(request, response) {
    // Get the question id
    const questionId = parseInt(request.params.id, 10);

    const {
      answer,
    } = request.body;
   const query = {
      text: 'INSERT INTO answers (answer, userid, questionid) VALUES ($1, $2, $3)',
      values: [ request.body.answer, request.body.userid, questionId],
    }
    client.connect();
    client.query(query, (error, dbResponse) => {
      if (error) {
        return response.status(500).json({
          success: 'false',
          message: 'Sorry the operation failed',
          error: error.stack,
        });
      }
      return response.status(200).json({
        status: 'Success',
        Message: 'Answer successfully submitted',
        answer,
      });
    });
  }
}

export default AnswerController;
