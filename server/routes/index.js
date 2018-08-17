import QuestionController from '../controllers/questionscontroller';

// Declare routes module
const routes = (app) => {
  // Define home route
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to StackOverflow-lite',
  }));

  // define route to add question
  app.post('/api/v1/questions', QuestionController.askQuestion);
};

export default routes;
