import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testData from './testData';

const { expect } = chai;
const signupURL = '/api/v1/auth/signup';
const signinURL = '/api/v1/auth/signin';
chai.use(chaiHttp);

describe('POST /api/v1/auth/signup', () => {
  it('it should register a user with correct and complete information', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send(testData.newUsers[0])
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Acount created successfully');
        done();
      });
  });

  it('should not register a user with an existing email address', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send(testData.newUsers[0])
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.error).to.be.an('object');
        expect(response.body.error.emailExists).to.equal('Sorry, this email address is taken');
        done();
      });
  });

  it('should not register a user with an invalid email address', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: 'kspeed',
        email: 'kspeed@gmail',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.emailText).to.equal('Sorry, your email address is invalid. Enter a correct one.');
        done();
      });
  });

  it('should not register a user with email address less than 10 characters', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: 'kspeed',
        email: 'ed@gm.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.emailLength).to.equal('Sorry your email address must not be less than 10 characters');
        done();
      });
  });

  it('should not register a user with an empty email address field', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: 'kspeed',
        email: '',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry! all fields are required');
        done();
      });
  });

  it('should not register a user with an invalid full name', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: '2Korfi #Essien',
        username: 'kspeed',
        email: 'kspeed@gmail.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.fullnameText).to.equal('Invalid full name: your full name can only contain letters and spaces');
        done();
      });
  });

  it('should not register a user with fullname less than 10 characters', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi',
        username: 'kspeed',
        email: 'kspeeded@gm.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.error).to.be.an('object');
        expect(response.body.error.fullnameLength).to.equal('Your full name must not be less than 10 characters');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user with an empty full name field', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: '',
        username: 'kspeed',
        email: 'kspeedo@gmail.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry! all fields are required');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user with an existing username ', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send(testData.newUsers[0])
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry, this username is taken');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user with an invalid username', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: '@kspeed',
        email: 'kspeed@gmail.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.error).to.be.an('object');
        expect(response.body.error.usernameText).to.equal('Sorry! This username is invalid. Usernames cannot contain special characters or start with numbers.');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user with username less than 5 characters', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: 'kspe',
        email: 'kspeeded@gm.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.error).to.be.an('object');
        expect(response.body.error.usernameLength).to.equal('Your username cannot be less than 5 characters');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user without a username', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: '',
        email: 'ed@gm.com',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry! all fields are required');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user with password less than 8 characters', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: 'kspeed',
        email: 'ed@gm.com',
        password: 'kspeed',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.error).to.be.an('object');
        expect(response.body.error.passwdLength).to.equal('Sorry your password must not be less than 8 characters');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not register a user with an empty password field', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Korfi Essien',
        username: 'kspeed',
        email: 'ed@gm.com',
        password: '',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry! all fields are required');
        expect(response.body.success).to.equal(false);
        done();
      });
  });
});

describe('POST /api/v1/auth/signin', () => {
  it('it should signin a user with correct and complete information', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: 'kessoy',
        password: 'kessy2fresh',
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have been logged in successfully!');
        done();
      });
  });
  it('should not signin a user with an invalid username', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: '@kspeed',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error.usernameText).to.equal('Sorry, your username must be a string of alphanumeric and number characters, and must start with a letter');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not signin a user without a username', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: '',
        password: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry! both your username and password are required');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not signin a user with an empty password field', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: 'kspeed',
        password: '',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.error).to.equal('Sorry! both your username and password are required');
        expect(response.body.success).to.equal(false);
        done();
      });
  });
});
