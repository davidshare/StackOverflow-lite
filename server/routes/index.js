import QuestionController from '../controllers/questionscontroller';
import AnswerController from '../controllers/answerscontroller';

// Declare routes module
const routes = (app) => {
  // Define home route
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to StackOverflow-lite',
  }));

  // define post routes
  // post a question
  app.post('/api/v1/questions', QuestionController.askQuestion);

  // answer a quesion
  app.post('/api/v1/questions/:id/answers', AnswerController.answerQuestion);

  // define get routes
  // get all questions
  app.get('/api/v1/questions', QuestionController.getAllQuestions);

  // get single quesion
  app.get('/api/v1/questions/:id', QuestionController.getQuestionById);
};

export default routes;
