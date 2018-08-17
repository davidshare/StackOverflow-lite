import questions from '../models/questions';

class QuestionController {
  // Method for adding question
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
}

export default QuestionController;
