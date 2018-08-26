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
      done();
    });
  }

  static selectAnswer(request, response){
    client.connect();
    const {
      questionid, answerid
    } = request.params;
    if(!parseInt(questionid, 10) || !parseInt(answerid, 10)){
      return response.send({
        status: 'Fail',
        message: 'Sorry both the questionId and answerId must be integers',
      });
    }
    const query1 = `UPDATE answers set status = 't' WHERE id = ${answerid} AND questionId = ${questionid}`;
    const query2 = `UPDATE questions set status = 't' WHERE id = ${questionid}`;
    client.query(query1, (answerError, answerResponse) => {
      if (answerError || answerResponse.rowCount === 0) {
        return response.status(500).json({
          status: 'Fail',
          message: 'Sorry the operation failed. Could not select answer',
          answerError: answerError.stack,
          query1,
        });
      }
      client.query(query2, (questionError, questionResponse) => {
        if (questionError || questionResponse.rowCount === 0) {
          return response.status(500).json({
            status: 'Fail',
            message: 'Sorry the operation failed. Could not select the answer.',
            questionError: questionError.stack,
          });
        }
        return response.status(200).json({
          success: 'Success',
          message: 'The answer has been selected',
          answer: answerResponse.rowCount,
        });

      });
      
    });
  }
}

export default AnswerController;
