import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
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
        expect(response.body.status).to.be.equal('Success');
        done();
      });
  });

  it('should not register a user with an existing email address', (done) => {
    chai.request(app)
      .post(`${signupURL}`)
      .send({
        fullname: 'Kosama Essien',
        username: 'kosisi',
        email: 'kessy@gmail.com',
        passwd: 'kessy2fresh',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        console.log(response.body);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.emailExists).to.equal('Sorry, this email address is taken');
        expect(response.body.status).to.equal('Failed');
        expect(response.body.success).to.equal(false);
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.emailText).to.equal('Sorry, your email address is invalid. Enter a correct one.');
        expect(response.body.status).to.equal('Failed');
        expect(response.body.success).to.equal(false);
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.emailLength).to.equal('Sorry your email address must not be less than 10 characters');
        expect(response.body.status).to.equal('Failed');
        expect(response.body.success).to.equal(false);
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.emailEmpty).to.equal('Your email is required');
        expect(response.body.status).to.equal('Failed');
        expect(response.body.success).to.equal(false);
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.fullnameText).to.equal('Invalid full name: your full name can only contain letters and spaces');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.fullnameLength).to.equal('Your full name must not be less than 10 characters');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.fullnameEmpty).to.equal('Your full name is required');
        expect(response.body.status).to.equal('Failed');
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
        expect(response.body.errors.usernameTaken).to.equal('Sorry, this username is taken');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.usernameText).to.equal('Sorry! This username is invalid. Usernames cannot contain special characters or start with numbers.');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.usernameLength).to.equal('Your username cannot be less than 5 characters');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.usernameEmpty).to.equal('Your username is required');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kspeed',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.passwdLength).to.equal('Sorry your password must not be less than 8 characters');
        expect(response.body.status).to.equal('Failed');
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
        passwd: '',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.passwdEmpty).to.equal('Your password is required');
        expect(response.body.status).to.equal('Failed');
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
        passwd: 'kessy2fresh',
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('You have been logged in successfully!');
        expect(response.body.status).to.be.equal('Success');
        done();
      });
  });
  it('should not signin a user with an invalid username', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: '@kspeed',
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body).to.be.an('object');
        expect(response.body.errors.usernameText).to.equal('Sorry, your username must be a string of alphanumeric and number characters, and must start with a letter');
        expect(response.body.status).to.equal('Failed');
        expect(response.body.success).to.equal(false);
        done();
      });
  });

  it('should not signin a user without a username', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: '',
        passwd: 'kspeed230',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.usernameEmpty).to.equal('The username is required');
        expect(response.body.success).to.equal(false);
        expect(response.body.status).to.equal('Failed');
        done();
      });
  });

  it('should not signin a user with an empty password field', (done) => {
    chai.request(app)
      .post(`${signinURL}`)
      .send({
        username: 'kspeed',
        passwd: '',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.errors).to.be.an('object');
        expect(response.body.errors.passwdEmpty).to.equal('Your password is required');
        expect(response.body.success).to.equal(false);
        expect(response.body.status).to.equal('Failed');
        done();
      });
  });
});
