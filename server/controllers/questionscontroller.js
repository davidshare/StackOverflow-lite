import questions from '../models/questions';

class QuestionController {
  // post a question
  static askQuestion(req, res) {
    const {
      id,
      title,
      description,
      userid, views,
      created,
      active,
    } = req.body;
    const questionData = [
      ...questions,
      {
        id, title, description, userid, views, created, active,
      },
    ];
    res.status(200).json({ questions: questionData });
  }

  // get all questions
  static getAllQuestions(req, res) {
    res.status(200).json({
      success: 'true',
      message: 'sucessfully got all questions',
      questions,
    });
  }
}

export default QuestionController;
