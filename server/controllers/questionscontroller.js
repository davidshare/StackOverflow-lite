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
    res.status(200).json({
      success: 'true',
      message: 'Qestion successfully posted',
      questions,
    });
  }

  // get all questions
  static getAllQuestions(req, res) {
    res.status(200).json({
      success: 'true',
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
      res.status(200).send({
        success: 'Success',
        message: 'Question Question successfully retrieved!',
        question,
      });
    }
    return res.status(404).send({
      success: 'false',
      message: 'Question not found!',
    });
  }
}

export default QuestionController;
