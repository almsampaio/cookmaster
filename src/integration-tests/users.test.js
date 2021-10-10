const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const { getConnection } = require('./connectionMock');
const server = require('../api/app');

describe('POST /users', () => {
  let connectionMock;
  const name = 'name';
  const email = 'email@email.com';
  const password = 'password';
  const wrongEmail = 'email.com';

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When name is not informed', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/users').send({ email, password})
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When e-mail is not informed', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, password })
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When the e-mail informed has a invalid format', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, email: wrongEmail,
      password })
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When password is not informed', () => {
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, email })
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When user is created', () => {
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, email, password })
    });

    after(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.deleteMany({});
    })

    it('Returns status 201', async () => {
      expect(response).to.have.status(201);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "user" property', async () => {
      expect(response.body).to.have.property('user')
    });

    it('"User" property is not empty', async () => {
      expect(response.body.user).to.be.not.empty;
    });

    it('"User" property have _id', async () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('"User" property dont have password', async () => {
      expect(response.body.user).to.not.have.property('password');
    });

    it('"User" property have role', async () => {
      expect(response.body.user).to.have.property('role');
    });
    
    it('"Role" property has the value "user"', async () => {
      expect(response.body.user.role).to.equal('user');
    });

    it('"email" property has the correct value', async () => {
      expect(response.body.user.email).to.equal(email);
    });

    it('"name" property has the correct value', async () => {
      expect(response.body.user.name).to.equal(name);
    });

  });

});

describe('POST /login', () => {
  let connectionMock;
  email = 'email@email.com';
  wrongEmail = 'wrong@email.com';
  password = 'password';
  wrongPassword = 'wrongPassword';

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When e-mail is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/login').send({ password })
    });  

    it('Returns status 401', () => {
      expect(response).to.have.status(401);
    })

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('All fields must be filled')
    });
  });


  describe('When password is not informed', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/login').send({ email })
    });  

    it('Returns status 401', () => {
      expect(response).to.have.status(401);
    })

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('All fields must be filled')
    });
  });

  describe('When email is not registered', () => {
    let response;
    before(async () => {
      const userCollection = await connectionMock.db('Cookmaster').collection('users');

      await userCollection.insertOne({ email, password })

      response = await chai.request(server).post('/login').send({ email: wrongEmail, password });
    });

    it('Returns status 401', () => {
      expect(response.status).to.equal(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Incorrect username or password')
    });
  });

  describe('When password is wrong', () => {
    let response;
    before(async () => {
      const userCollection = await connectionMock.db('Cookmaster').collection('users');

      await userCollection.insertOne({ email, password })

      response = await chai.request(server).post('/login').send({ email, password: wrongPassword });
    });

    it('Returns status 401', () => {
      expect(response.status).to.equal(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Incorrect username or password')
    });
  });

  describe('When user log in', () => {
    let response;
    before(async () => {
      const userCollection = await connectionMock.db('Cookmaster').collection('users');

      await userCollection.insertOne({ email, password })

      response = await chai.request(server).post('/login').send({ email, password });
    });

    it('Returns status 200', () => {
      expect(response.status).to.equal(200);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "token" property', async () => {
      expect(response.body).to.have.property('token')
    });

    it('"Token" property is not empty', async () => {
      expect(response.body.token).to.not.be.empty;
    });
  })
});

/* /users/admin 
describe('POST /users/admin', () => {
  let connectionMock;
  const name = 'name';
  const email = 'email@email.com';
  const password = 'password';
  const wrongEmail = 'email.com';

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('When name is not informed', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/users').send({ email, password})
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When e-mail is not informed', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, password })
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When the e-mail informed has a invalid format', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, email: wrongEmail,
      password })
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When password is not informed', () => {
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, email })
    });

    it('Returns status 400', async () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When user is created', () => {
    before(async () => {
      response = await chai.request(server).post('/users').send({ name, email, password })
    });

    it('Returns status 201', async () => {
      expect(response).to.have.status(201);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object')
    });

    it('Response Object has a "user" property', async () => {
      expect(response.body).to.have.property('user')
    });

    it('"User" property is not empty', async () => {
      expect(response.body.user).to.be.not.empty;
    });

    it('"User" property have _id', async () => {
      expect(response.body.user).to.have.property('_id');
    });

    it('"User" property dont have password', async () => {
      expect(response.body.user).to.not.have.property('password');
    });

    it('"User" property have role', async () => {
      expect(response.body.user).to.have.property('role');
    });
    
    it('"Role" property has the value "user"', async () => {
      expect(response.body.user.role).to.equal('admin');
    });

    it('"email" property has the correct value', async () => {
      expect(response.body.user.email).to.equal(email);
    });

    it('"name" property has the correct value', async () => {
      expect(response.body.user.name).to.equal(name);
    });

  });
});
*/
