import QuestionController from '../controllers/questionscontroller';
import AnswerController from '../controllers/answerscontroller';
import QuestionValidator from '../middleware/questionValidator';
import AnswerValidator from '../middleware/answerValidator';
import UserAuthentication from '../middleware/userauthenticate';
import UserController from '../controllers/userscontroller';

// Declare routes module
const routes = (app) => {
  // Define home route
  app.get('/', (request, reponse) => response.status(200).send({
    message: 'Welcome to StackOverflow-lite',
  }));

  // define post routes
  // post a question
  app.post('/api/v1/questions', QuestionValidator.validateQuestion, QuestionController.askQuestion, UserAuthentication.authenticateUser);

  // answer a quesion
  app.post('/api/v1/questions/:id/answers', QuestionValidator.validateQuestionId, AnswerValidator.validateAnswer, AnswerController.answerQuestion, UserAuthentication.authenticateUser);

  // define get routes
  // get all questions
  app.get('/api/v1/questions', QuestionController.getAllQuestions);

  // get single quesion
  app.get('/api/v1/questions/:id', QuestionValidator.validateQuestionId, QuestionController.getQuestionById);

  //DELETE A QUESTION
  app.delete('/api/v1/questions/:id', QuestionValidator.validateQuestionId, QuestionController.deleteQuestionById, UserAuthentication.authenticateUser);

  //Auth routes
  // Create user acount
  app.post('/api/v1/auth/signup', UserController.signUp, UserAuthentication.authenticateUser);

  // Signin 
  app.post('/api/v1/auth/signin', UserController.signIn, UserAuthentication.authenticateUser);

};

export default routes;
