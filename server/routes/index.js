import QuestionController from '../controllers/questionscontroller';
import AnswerController from '../controllers/answerscontroller';
import QuestionValidator from '../middleware/questionValidator';
import AnswerValidator from '../middleware/answerValidator';

// Declare routes module
const routes = (app) => {
  // Define home route
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to StackOverflow-lite',
  }));

  // define post routes
  // post a question
  app.post('/api/v1/questions', QuestionValidator.validateQuestion, QuestionController.askQuestion);

  // answer a quesion
  app.post('/api/v1/questions/:id/answers', AnswerValidator.validateAnswer, AnswerController.answerQuestion);

  // define get routes
  // get all questions
  app.get('/api/v1/questions', QuestionController.getAllQuestions);

  // get single quesion
  app.get('/api/v1/questions/:id', QuestionValidator.validateQuestionId, QuestionController.getQuestionById);
};

export default routes;
