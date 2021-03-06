import QuestionController from '../controllers/questionscontroller';
import AnswerController from '../controllers/answerscontroller';
import QuestionValidator from '../middleware/questionValidator';
import AnswerValidator from '../middleware/answerValidator';
import UserAuthentication from '../middleware/userauthenticate';
import SignupValidator from '../middleware/signupValidator';
import CheckDuplicates from '../middleware/checkDuplicates';
import SigninValidator from '../middleware/signinValidator';
import UserController from '../controllers/userscontroller';


// Declare routes module
const routes = (app) => {
// GET routes
  app.get('/', (request, response) => response.status(200).send({
    statusCode: 200,
    success: true,
    message: 'Welcome to StackOverflow-lite',
  }));

  app.get('/api/v1/questions', QuestionController.getAllQuestions);

  app.get('/api/v1/questions/:id', QuestionValidator.validateQuestionId, QuestionController.getQuestionById);

  // POST routes
  app.post('/api/v1/questions', UserAuthentication.authenticateUser, QuestionValidator.validateQuestion,
    QuestionController.askQuestion);

  app.post('/api/v1/questions/:id/answers', UserAuthentication.authenticateUser,
    AnswerValidator.validateAnswer, AnswerController.answerQuestion);

  app.post('/api/v1/auth/signup', CheckDuplicates.checkDuplicateEmail, CheckDuplicates.checkDuplicateUser, SignupValidator.validateSignup, UserController.signUp);

  app.post('/api/v1/auth/signin', SigninValidator.validateSignin, UserController.signIn);

  // DELETE routes
  app.delete('/api/v1/questions/:id', UserAuthentication.authenticateUser, QuestionValidator.validateQuestionId,
    QuestionController.deleteQuestionById);

  // PUT routes
  app.put('/api/v1/questions/:questionid/answers/:answerid', UserAuthentication.authenticateUser,
    AnswerController.selectAnswer);
};

export default routes;
