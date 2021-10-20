const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { getConnection } = require('./connectionMock');
const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('When email and password arent filled', () => {
    let response;

    before (async () => {
      response = await chai.request(app).post('/login').send({});
    })

    it('return HTTP 401', () => {
      expect(response).to.have.status(401);
    });

    it('return body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has `message` property', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('message property has its proper message ', () => {
      expect(response.body.message).to.be.equal('All fields must be filled')
    });
  });

  describe('When email doesn`t exists', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(app).post('/login').send({
        email: 'test@test.com',
        password: '12345678',
      });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('return HTPP 401', () => {
      expect(response).to.have.status(401);
    });

    it('return body', () => {
      expect(response.body).to.be.an('object');
    });

    it('response object has `message` property', () => {
      expect(response.body).to.have.property('message');
    });

    it('message property has its proper message ', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password')
    });
  });

  describe('When login is successful', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: 'Teste Foi',
        email: 'test_foi@test.com',
        password: '12345678'
      });

      response = await chai.request(app).post('/login').send({
        email: 'test_foi@test.com',
        password: '12345678',
      });
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('return HTTP 200', () => {
      expect(response).to.have.status(200);
    });

    it('return token', () => {
      expect(response.body).to.have.property('token')
    });
  });
}); 