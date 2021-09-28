const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { getConnection } = require('./connection');

chai.use(chaiHttp);
const { expect } = chai;
const DBServer = new MongoMemoryServer();

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

    it('return status 200', async () => {
      expect(response.body).to.have.property('token');
    });

    it('return an object', () => {
      expect(response.body).to.be.a('object');
    });
  });
});