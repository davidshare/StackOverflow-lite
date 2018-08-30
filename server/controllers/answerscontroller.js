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
            status: 500,
            success: false,
            error: 'Sorry the answer could not be posted',
          });
        }
        return response.status(200).json({
          status: 200,
          Success: true,
          Message: 'Answer successfully submitted',
          answer,
        });
      })
      .catch((error) => {
        response.status.send({
          status: 500,
          success: false,
          error: error.stack,
        });
      });
  }

  static selectAnswer(request, response) {
    const {
      questionid, answerid,
    } = request.params;
    const idPattern = /^[0-9]{1,}/;
    if (idPattern.test(parseInt(questionid, 10)) && idPattern.test(parseInt(answerid, 10))) {
      const query = `UPDATE questions set answer = ${answerid} WHERE id = ${questionid}`;
      client.query(query)
        .then((dbResult) => {
          if (dbResult.rowCount === 0) {
            return response.status(500).json({
              status: 500,
              success: false,
              error: 'Sorry the answer could not be selected',
            });
          }
          return response.status(200).json({
            status: 200,
            success: true,
            Message: 'Answer successfully selected',
            answerid,
          });
        })
        .catch((error) => {
          response.status(500).send({
            status: 500,
            success: false,
            error: error.stack,
          });
        });
    } else {
      return response.status(500).json({
        status: 406,
        success: false,
        error: 'Both the answer Id and the user question Id must be integers',
      });
    }
  }
}

export default AnswerController;
