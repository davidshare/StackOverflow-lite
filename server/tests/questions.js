import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect } = chai;
const questionsURL = '/api/v1/questions';
chai.use(chaiHttp);

describe('GET /api/v1/questions', () => {
  it('it should get all questions', (done) => {
    chai.request(app)
      .get(`${questionsURL}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('questions');
        expect(response.body.message).to.equal('sucessfully got all questions');
        expect(response.body.success).to.be.equal('true');
        done();
      });
  });
