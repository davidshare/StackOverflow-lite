import questions from '../models/questions';

class AnswerController {
  // Method to post user question
  static answerQuestion(req, res) {
    // Get the question id
    const id = parseInt(req.params.id, 10);

    // Check if the id exists
    if (id < questions.length) {
      // Get question with user supplied id
      const question = questions.filter(currentQuestion => currentQuestion.id === id);

      // Get the answers array and increment id
      const { answers } = question[0];
      const answerid = answers.length + 1;

      // Get the user data from the request object
      const {
        answer,
        created,
        userid,
        status,
      } = req.body;

      // add the answer to the answers array
      answers.push({
        answerid, answer, created, userid, status,
      });

      return res.status(200).json({
        status: 'Success',
        Message: 'Answer successfully submitted',
        question,
      });
    }

    return res.status(400).send({
      success: 'false',
      message: 'Sorry the operation failed',
    });
  }
}

export default AnswerController;
