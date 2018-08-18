import QuestionController from '../controllers/questionscontroller';

// Declare routes module
const routes = (app) => {
  // Define home route
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to StackOverflow-lite',
  }));

  // define post routes
  app.post('/api/v1/questions', QuestionController.askQuestion);

  // define get routes
  app.get('/api/v1/questions', QuestionController.getAllQuestions);

  app.get('/api/v1/questions/:id', QuestionController.getQuestionById);
};

export default routes;
