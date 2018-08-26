import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
const answerURL = '/api/v1/questions/1/answers';
chai.use(chaiHttp);

describe('GET /api/v1/questions/e/answers', () => {
  it('should not allow user to enter invalid question id', (done) => {
    chai.request(app)
      .post('/api/v1/questions/e/answers')
      .send({
        answer: 'My answer is valid and it is up to fifty characters',
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.include('Sorry the question id must be an integer');
        done();
      });
  });

  it('should not add an answer with an empty field', (done) => {
    chai.request(app)
      .post(`${answerURL}`)
      .send({
        answer: ' ',
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.answerEmpty).to.include('The answer field is required');
        done();
      });
  });

  it('should not add an answer with less than 50 characters', (done) => {
    chai.request(app)
      .post(`${answerURL}`)
      .send({
        answer: 'Please how to i prepare afang soup?',
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.answerLength).to.include('Your answer should not be less than 50 characters');
        done();
      });
  });

  it('should not add an answer with invalid characters', (done) => {
    chai.request(app)
      .post(`${answerURL}`)
      .send({
        answer: '$% this is my answer',
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.answerText).to.include('Sorry, your answer must be a string of alphanumeric, and special characters and must start with a letter');
        done();
      });
  });
});
