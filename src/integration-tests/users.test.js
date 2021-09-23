const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST  /users', () => {
  describe('created successfully', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(
        URLMock, { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Marcus Cesar",
          "email": "email@email.com",
          "password": "123456"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('returns status 201', () => {
      expect(response).to.have.status(201);
    });

    it('return an object', () => {
      expect(response.body).to.be.a('object');
    });

    it('object have property "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('user have the correct keys', () => {
      expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    })

    it('contains the correct name value', () => {
      expect(response.body.user.name).to.be.equal('Marcus Cesar')
    })

    it('contains the correct email value', () => {
      expect(response.body.user.email).to.be.equal('email@email.com')
    })

    it('contains the correct role value', () => {
      expect(response.body.user.role).to.be.equal('user')
    })
  });

  describe('create failed, wrong entries', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(
        URLMock, { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('name field required', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "",
          "email": "email@email.com",
          "password": "123456"


        });

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });

    it('email field required', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Marcus Cesar",
          "password": "123456"
        });

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });

    it('password field required', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Marcus Cesar",
          "email": "email@email.com",
        });

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });

    it('It is not possible to register user with invalid email ', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Marcus Cesar",
          "email": "email@",
          "password": "123456"
        });

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.')
    });

    it('Email field is unique', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Marcus Cesar",
          "email": "email@email",
          "password": "123456"
        });

      expect(response).to.have.status(201);
    });

  });
});
