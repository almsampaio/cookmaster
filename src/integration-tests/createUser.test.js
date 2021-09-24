const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/server');

describe('When entries are wrong', () => {
  let response;

  before(async () => {
    response = await chai.request(server)
      .post('/users')
      .send({});
  });
  it('Status 400', () => {
    expect(response).to.have.status(400);
  });
  it('Return an object', () => {
    expect(response).to.be.an('object');
  });
  it('Expect message to have proper content', () => {
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');
  });
});

describe('Create a new user', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When user already exists', () => {
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
      .post('/users')
      .send({
        name: 'user',
        email: 'user@trybe.com.br',
        password: 'trybe123',
      });
    });

    it('Return status 409', () => {
      expect(response).to.have.status(409);
    });

    it('Return an object', () => {
      expect(response).to.be.an('object');
    });
  });
  
  describe('When user is created succesfully', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'user2',
        email: 'user2@trybe.com.br',
        password: 'trybe321',
      });
    });
    
    it('Expect status 201', () => {
      expect(response).to.have.status(201);
    });
  });
});
