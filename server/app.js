// import modules
import Express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

// declare constants
const app = new Express();
const port = process.env.PORT || 3000;

// declare middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// set the routes
routes(app);

// declare 404 route
app.all('*', (req, res) => res.status(404).json({
  message: 'The URL you are trying to access does not exist. Please enter a valide url',
  status: 'fail',
}));

// listen to app port
app.listen(3000, () => console.log(`Listening on port ${port}`));

export default app;
