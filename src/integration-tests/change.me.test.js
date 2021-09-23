const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
  describe('when an user is created', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'jane',
          email: 'jane@gmail.com',
          password: '12345678',
        });
      });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
  });


    it('returns status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });

  })
})

describe('POST /users', () => {
  describe('when name is not provided', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').deleteMany({});
      response = await chai.request(server)
        .post('/users')
        .send({
          name: '',
          email: 'jane@gmail.com',
          password: '12345678',
        });
      });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
  });


    it('returns status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('response object has "message" property', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('"message" property is "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });

  })
})

describe('POST /login', () => {
  describe('when an user login', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      db = connectionMock.db('Cookmaster');
      await db.collection('users').insertOne({ 
        name: 'jane',
        email: 'jane@gmail.com',
        password: '12345678',
        role: 'user',});
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'jane@gmail.com',
          password: '12345678',
        });
      });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
  });


    it('returns status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has "token" property', () => {
      expect(response.body).to.have.property('token');
    });
    
    it('object on body is not empty', () => {
      expect(response.body).to.be.not.empty;
    });

  })
})