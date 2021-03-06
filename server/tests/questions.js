import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';

const { expect } = chai;
const questionsURL = '/api/v1/questions';
const signupURL = '/api/v1/auth/signup';

let currentToken;
chai.use(chaiHttp);

describe('GET /api/v1/questions', () => {
  it('it should get all questions', (done) => {
    chai.request(app)
      .get(`${questionsURL}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('questions');
        expect(response.body.message).to.equal('Successfully got all questions');
        done();
      });
  });
});

describe('GET /api/v1/questions/1', () => {
  it('should allow user to view a single question', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('question');
        expect(response.body.message).to.equal('Question successfully retrieved!');
        done();
      });
  });

  it('should not allow user to enter invalid Id', (done) => {
    chai.request(app)
      .get('/api/v1/questions/ef')
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.include('Sorry the question id must be an integer');
        done();
      });
  });
});

describe('POST /api/v1/questions', () => {
  before((done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send(testData.newUsers[2])
      .end((error, response) => {
        currentToken = response.body.token;
        done();
      });
  });

  it('should post a question with the correct questions details', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send(testData.newQuestion[1])
      .set('token', currentToken)
      .end((error, response) => {
        console.log('====>', testData.newQuestion[1], '====> token: ', currentToken);
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Acount created successfully');
        done();
      });
  });

  it('should not add question with an empty title field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .set('token', currentToken)
      .send({
        title: ' ',
        description: `I have been trying to prepare afang soup 
        since last week, and I have had several failed attempts. What can I do?`,
        token: currentToken,
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.titleEmpty).to.include('The title field is required');
        done();
      });
  });

  it('should not add question with invalid characters for the title field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .set('token', currentToken)
      .send({
        title: '$%@ruiifi',
        description: 'I have been trying to prepare afang soup since last week, and I have had several failed attempts. What can I do?',
        token: currentToken,
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.titleText).to.include('The title field can only have alphanumeric characters');
        done();
      });
  });

  it('should not add questions with title less than 10 characters', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .set('token', currentToken)
      .send({
        title: 'What is ',
        description: 'Sorry the title must not be less than 15 characters',
        token: currentToken,
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.titleLength).to.include('Sorry the title must not be less than 10 characters');
        done();
      });
  });

  it('should not add question with an empty description field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .set('token', currentToken)
      .send({
        title: 'Please how to i prepare afang soup?',
        description: ' ',
        token: currentToken,
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.descriptionEmpty).to.include('The description field is required');
        done();
      });
  });

  it('should not add question with description with less than 50 characters', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .set('token', currentToken)
      .send({
        title: 'Please how to i prepare afang soup?',
        description: 'You prepare afang soup',
        token: currentToken,
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.descriptionLength).to.include('Sorry your description must not be less than 50 or more than 500 characters');
        done();
      });
  });

  it('should not add question with invalid description', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .set('token', currentToken)
      .send({
        title: 'Please how to i prepare afang soup?',
        description: '9 things i want to do',
        token: currentToken,
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.descriptionText).to.include('Sorry, your description must be a string of alphanumeric, and special characters and must start with a letter');
        done();
      });
  });
});
