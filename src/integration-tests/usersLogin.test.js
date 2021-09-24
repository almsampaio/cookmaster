const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/server');
const { response } = require('express');

describe('Login test when there is no password or email ', () => {
  let response;
  before(async () => {
    response = await chai.request(server)
    .post('/login')
    .send({});
  });

  it('Status is 401', () => {
    expect(response).to.have.status(401);
  });
  it('Response body is an object', () => {
    expect(response.body).to.be.an('object');
  });
  it('Response body to have property message', () => {
    expect(response.body).to.have.property('message');
  });
  it('Response body to have property message with proper content', () => {
    expect(response.body.message).to.be.equals('All fields must be filled');
  });
});

describe('Login with an email and password', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Login with wrong password', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'nonExiste',
        password: 'nonExiste',
      });
    });

    it('Return status 401', () => {
      expect(response).to.have.status(401);
    });
    it('Response body is an object', () => {
      expect(response.body).to.be.an('object');
    });
    it('Response body to have property message', () => {
      expect(response.body).to.have.property('message');
    });
    it('Response body to have property message with proper content', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('Login with correct email and password', () => {
    let response;

    before(async () => {
      const usersCollection = await connectionMock.db('Cookmaster').collection('users');

      await usersCollection.insertOne({
        name: 'user',
        email: 'user@trybe.com.br',
        password: 'trybe123',
        role: 'user',
      });

      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'user@trybe.com.br',
        password: 'trybe123',
      });
    });
    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });
    it('Return object', () => {
      expect(response).to.be.an('object');
    });
    it('Return to have property token', () => {
      expect(response.body).to.have.property('token');
    })
  });
});
