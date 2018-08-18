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

  // get question by id
  static getQuestionById(req, res) {
    // get the id from the request object and convert it to an integer
    const id = parseInt(req.params.id, 10);
    if(id<questions.length) {
      for(let question of questions) {
        if(question.id === id){
          res.status(200).json({
              success: 'true',
              message: 'sucessfully got question',
              question,
          });
        }
      }
    }else{
      res.status(404).json({
        success: 'false',
        message: 'Sorry, the question cannot be found',
      });
    }
    
  }
}

export default QuestionController;
