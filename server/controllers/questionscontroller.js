import connection from '../helpers/conn';

const client = connection();
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
      values: [title, description, userid],
    };

    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(500).json({
            statusCode: 500,
            success: false,
            error: 'Sorry your question could not be posted.',
          });
        }
        return response.status(200).json({
          statusCode: 200,
          success: true,
          message: 'Question successfully posted',
          question: dbResult.rows[0],
        });
      })
      .catch((error) => {
        response.status(500).send({
          statusCode: 500,
          success: false,
          error: error.stack,
        });
      });
  }

  // get all questions
  static getAllQuestions(request, response) {
    const query = 'SELECT * from questions';

    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            statusCode: 404,
            success: false,
            error: 'Could not get questions',
          });
        }
        return response.status(200).json({
          statusCode: 200,
          success: true,
          message: 'Successfully got all questions',
          questions: dbResult.rows,
        });
      })
      .catch((error) => {
        response.status(500).send({
          statusCode: 500,
          success: false,
          error: error.stack,
        });
      });
  }

  static getQuestionById(request, response) {
    const id = parseInt(request.params.id, 10);
    const query = `SELECT * from questions WHERE id = ${id}`;
    client.query(query)
      .then((dbResult) => {
        if (!dbResult.rows[0]) {
          return response.status(404).json({
            statusCode: 404,
            success: false,
            error: 'Question not found!',
          });
        }
        return response.status(200).json({
          statusCode: 200,
          success: true,
          message: 'Question successfully retrieved!',
          question: dbResult.rows[0],
        });
      })
      .catch((error) => {
        response.status(500).send({
          statusCode: 500,
          success: false,
          error: error.stack,
        });
      });
  }

  static deleteQuestionById(request, response) {
    const id = parseInt(request.params.id, 10);
    const query = `DELETE FROM questions WHERE id = ${id}`;

    client.query(query)
      .then((dbResult) => {
        if (dbResult.rowCount === 0) {
          return response.status(500).json({
            statusCode: 500,
            success: false,
            error: 'Question could not be deleted or it does not exist',
          });
        }
        return response.status(200).json({
          statusCode: 200,
          success: true,
          message: 'Question successfully deleted!',
        });
      })
      .catch((error) => {
        response.status(500).send({
          success: false,
          statusCode: 500,
          error: error.stack,
        });
      });
  }
}

export default QuestionController;
