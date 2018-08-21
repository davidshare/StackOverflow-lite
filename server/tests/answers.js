import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
const answerURL = '/api/v1/questions/1/answers';
chai.use(chaiHttp);

describe('GET /api/v1/questions/1/answers', () => {
  it('should not allow user to enter invalid question id', (done) => {
    chai.request(app)
      .get('answerURL')
      .send({
        id: ' ',
      })
      .end((err, res) => {
         expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.errors).to.include('Question id must be an integer.');
          done();
      });
  });

  it('should not add an answer with an empty field', (done) => {
    chai.request(app)
      .post(`${answerURL}`)
      .send({
        answer: ' ',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The answer field is cannot be empty.');
        done();
      });
  });

  it('should not add an answer with less than 50 characters', (done) => {
    chai.request(app)
      .post(`${answerURL}`)
      .send({
        answer: 'Please how to i prepare afang soup?',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('Your answer should not be less than 50 characters.');
        done();
      });
  });

  it('should not add an answer with invalid characters', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: '$% this is my answer',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The answer must be alphanumeric .');
        done();
      });
  });
});