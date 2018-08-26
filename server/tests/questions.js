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
      .get('/api/v1/questions/5')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('question');
        expect(response.body.message).to.equal('Question successfully retrieved!');
        expect(response.body.status).to.be.equal('Success');
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
  it('should not add question with an empty title field', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: ' ',
        description: 'I have been trying to prepare afang soup since last week, and I have had several failed attempts. What can I do?',
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.titleEmpty).to.include('The title field is required');
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
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.titleText).to.include('The title field can only have alphanumeric characters');
        done();
      });
  });

  it('should not add questions with title less than 15 characters', (done) => {
    chai.request(app)
      .post(`${questionsURL}`)
      .send({
        title: 'What is ',
        description: 'Sorry the title must not be less than 15 characters',
      })
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.titleLength).to.include('Sorry the title must not be less than 10 characters');
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
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.descriptionEmpty).to.include('The description field is required');
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
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.descriptionLength).to.include('Sorry your description must not be less than 50 or more than 500 characters');
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
      .end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.descriptionText).to.include('Sorry, your description must be a string of alphanumeric, and special characters and must start with a letter');
        done();
      });
  });
});
