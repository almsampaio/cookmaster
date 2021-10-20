const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { getConnection } = require('./connectionMock');
const { MongoClient } = require('mongodb');

const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('When user is registered', () => {
    let connectionMock;
    let response;

    before (async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).post('/users').send({
        name: 'Testado',
        email: 'testado@test.com',
        password: '123456',
      });
    })

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('return HTTP 201', () => {
      expect(response).to.have.status(201);
    });

    it('return user object', () => {
      expect(response.body).to.be.an('object');
    });

    it('return user info', () => {
      expect(response.body).to.have.property('user');
    });

  });
}); 