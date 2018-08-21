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
        expect(response.body.status).to.be.equal('Success');
        done();
      });
  });
});

describe('GET /api/v1/questions/1', () => {
  it('should allow user to view a single question', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('question');
        expect(res.body.message).to.equal('Question successfully retrieved!');
        expect(res.body.status).to.be.equal('Success');
        done();
      });
  });

  it('should not allow user to enter invalid Id', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1')
      .end((err, res) => {
         expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.errors).to.include('Question id must be an integer.');
          done();
      });
  });
});

describe('POST /api/v1/questions', () => {
  it('should not add question with an empty title field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: ' ',
        description: 'I have been trying to prepare afang soup since last week, and I have had several failed attempts. What can I do?',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The title field is required.');
        done();
      });
  });

  it('should not add question with invalid characters for the title field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: '$%@ruiifi',
        description: 'I have been trying to prepare afang soup since last week, and I have had several failed attempts. What can I do?',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The title field is required.');
        done();
      });
  });

  it('should not add questions with title less than 15 characters', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: 'What is ',
        description: 'I have been trying to prepare afang soup since last week, and I have had several failed attempts. What can I do?',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The title field is required.');
        done();
      });
  });

  it('should not add question with an empty description field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: 'Please how to i prepare afang soup?',
        description: ' ',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The description field is required.');
        done();
      });
  });

  it('should not add question with description with less than 50 characters', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: 'Please how to i prepare afang soup?',
        description: 'You prepare afang soup',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The description field is required.');
        done();
      });
  });

  it('should not add question with invalid description', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: 'Please how to i prepare afang soup?',
        description: '9 things i want to do',
      })
      .end((err, res) => {
        expect(res.status).to.equal(406);
        expect(res.body).to.be.an('object');
        expect(res.body.errors).to.include('The description field is required.');
        done();
      });
  });
});