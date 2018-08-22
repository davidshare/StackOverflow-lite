import questions from '../models/questions';

class QuestionController {
  // post a question
  static askQuestion(req, res) {
    const id = questions.length + 1;
    const answers = [];
    const status = false;

    // get the data for the question
    const {
      title,
      description,
      userid,
      views,
      created,
      active,
      upvotes,
      downvotes,
    } = req.body;

    // add the new question to the questions array
    questions.push({
      id, title, description, userid, views, created, active, upvotes, downvotes, status, answers,
    });

    // send the questions as response
    return res.status(200).json({
      status: 'Success',
      message: 'Qestion successfully posted',
      questions,
    });
  }

  // get all questions
  static getAllQuestions(req, res) {
    return res.status(200).json({
      status: 'Success',
      message: 'sucessfully got all questions',
      questions,
    });
  }

  // get question by id
  static getQuestionById(req, res) {
    // get the id from the request object and convert it to an integer
    const id = parseInt(req.params.id, 10);
    if (id < questions.length) {
      const question = questions.filter(currentQuestion => currentQuestion.id === id);
      return res.status(200).send({
        status: 'Success',
        message: 'Question successfully retrieved!',
        question,
      });
    }
    return res.status(406).send({
      status: 'Fail',
      message: 'Question not found!',
    });
  }
}

export default QuestionController;
