const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const server = require("../api/app");

const { MongoClient } = require('mongodb');
const { getConnection } = require('./ConnectionMock');

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When it is not inserted a user or password', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({});
    });

    it('returns a code status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('returns an object with the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('returns the property "message" with the value "All fields must be filled"', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('When the "user" does not exist or it is invalid', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'fake-email',
          password: 'fake-password',

        });
    });

    after(async () => {
    });

    it('returns a code status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('returns an object with the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('returns an object with the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('returns the property "message" with the value "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('When login it is success', () => {
    let response;
    before(async () => {
      const usersDB = connectionMock.db('Cookmaster').collection('users');

      await usersDB.insertOne({
        name: 'teste',
        email: 'teste@gmail.com',
        password: '123456',
      })

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'teste@gmail.com',
          password: '123456',

        });
    });

    it('returns a code status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('returns an object on body', () => {
      expect(response.body).to.be.an('object');
    });

    it('returns an object with the property "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('returns the property "token" not empty', () => {
      expect(response.body.token).to.be.not.empty;
    });
  });
});