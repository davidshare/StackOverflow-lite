import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';

const { expect } = chai;
const answerURL = '/api/v1/questions/1/answers';
const signupURL = '/api/v1/auth/signup';

let currentToken;
chai.use(chaiHttp);

describe('ANSWERS CONTROLLER', () => {
  before((done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send(testData.newUsers[1])
      .end((error, response) => {
        currentToken = response.body.token;
        done();
      });
  });

  describe('POST /api/v1/questions/e/answers', () => {
    it('should not allow user to enter invalid question id', (done) => {
      chai.request(app)
        .post('/api/v1/questions/e/answers')
        .set('token', currentToken)
        .send({
          answer: 'My answer is valid and it is up to fifty characters',
          token: currentToken,
        })
        .end((error, response) => {
          expect(response.status).to.equal(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.questionId).to.include('Sorry the question id must be an integer');
          done();
        });
    });

    it('should not add an answer with an empty field', (done) => {
      chai.request(app)
        .post(`${answerURL}`)
        .set('token', currentToken)
        .send({
          answer: ' ',
          token: currentToken,
        })
        .end((error, response) => {
          expect(response.status).to.equal(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.answerEmpty).to.include('The answer field is required');
          done();
        });
    });

    it('should not add an answer with less than 50 characters', (done) => {
      chai.request(app)
        .post(`${answerURL}`)
        .set('token', currentToken)
        .send({
          answer: 'Please how to i prepare afang soup?',
          token: currentToken,
        })
        .end((error, response) => {
          expect(response.status).to.equal(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.answerLength).to.include('Your answer should not be less than 50 characters');
          done();
        });
    });

    it('should not add an answer with invalid characters', (done) => {
      chai.request(app)
        .post(`${answerURL}`)
        .set('token', currentToken)
        .send({
          answer: '$% this is my answer',
          token: currentToken,
        })
        .end((error, response) => {
          expect(response.status).to.equal(406);
          expect(response.body).to.be.an('object');
          expect(response.body.error.answerText).to.include('Sorry, your answer must be a string of alphanumeric, and special characters and must start with a letter');
          done();
        });
    });
  });
});
