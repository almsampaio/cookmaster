const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connection');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', () => {
  describe('login success', async () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
          "name": "Marcus Cesar",
          "email": "email@gmail.com",
          "password": "123456"
        });

      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "email@gmail.com",
          "password": "123456"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('return status 200', async () => {
      expect(response).to.have.status(200);
    });

    it('return an object', () => {
      expect(response.body).to.be.a('object');
    });

    it('return a property token', async () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('login failed', async () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
          "name": "Marcus Cesar",
          "email": "email@gmail.com",
          "password": "123456"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('email field required', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "",
          "password": "123456"
        });
      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('All fields must be filled')
    });

    it('password field required', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "email@email.com",
          "password": ""
        });
      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('All fields must be filled')
    });

    it('user not found', async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          "email": "email@email.com",
          "password": "123456"
        });
      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Incorrect username or password')
    });
  });
});