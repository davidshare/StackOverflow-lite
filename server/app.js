import Express from 'express';
import bodyParser from 'body-parser';

const app = new Express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.get('/', (req, res) => res.send({
    message: 'Welcome to StackOverflow-lite',
}));

app.listen(3000, () => console.log(`Listening on port ${port}`));
