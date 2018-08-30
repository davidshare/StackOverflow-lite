import connection from '../helpers/conn';

const client = connection();
client.connect();

class AnswerController {
  static answerQuestion(request, response) {
    const questionId = parseInt(request.params.id, 10);
    const {
      answer,
    } = request.body;
    const query = {
      text: 'INSERT INTO answers (answer, userid, questionid) VALUES ($1, $2, $3)',
      values: [request.body.answer, request.body.userid, questionId],
    };
    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(500).json({
            success: 'Failed',
            message: 'Sorry the answer could not be posted',
          });
        }
        return response.status(200).json({
          status: 'Success',
          Message: 'Answer successfully submitted',
          answer,
        });
      })
      .catch((error) => {
        response.send({
          error: error.stack,
        });
      });
  }

  static selectAnswer(request, response) {
    const {
      questionid, answerid,
    } = request.params;
    const query = `UPDATE questions set answer = ${answerid} WHERE id = ${questionid}}`;

    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(500).json({
            success: 'Failed',
            message: 'Sorr the answer could not be selected',
          });
        }
        return response.status(200).json({
          status: 'Success',
          Message: 'Answer successfully selected',
        });
      })
      .catch((error) => {
        response.send({
          error: error.stack,
        });
      });
  }
}

export default AnswerController;
