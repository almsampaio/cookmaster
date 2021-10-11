const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { expect } = chai;
chai.use(chaiHttp);

const USER_LOGIN = {
  email: 'xablau@email.com',
  password: 'xablau'
};

let connection;

describe('Testes para a rota "/login"', () => {
  before(async () => {
    connection = await connectionMock();
    sinon.stub(MongoClient, 'connect').resolves(connection);
  });
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Testes para realização de login com sucesso', () => {
    let response;
    before(async () => {
      const usersDB = connection.db('Cookmaster').collection('users');
      await usersDB.deleteMany({});
      await usersDB.insertOne(USER_LOGIN);

      response = await chai.request(server).post('/login').send(USER_LOGIN);
    });

    it('Retorna um status code 200', () => {
      expect(response).to.have.status(200);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('Testes para realização de login sem password', () => {
    let response;
    before(async () => {
      const usersDB = connection.db('Cookmaster').collection('users');
      await usersDB.deleteMany({});
      await usersDB.insertOne(USER_LOGIN);

      response = await chai.request(server).post('/login').send({ email: 'ukulele@email.com' });
    });

    it('Retorna um status code 401', () => {
      expect(response).to.have.status(401);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" deve ter valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Testes para realização de login sem email', () => {
    let response;
    before(async () => {
      const usersDB = connection.db('Cookmaster').collection('users');
      await usersDB.deleteMany({});
      await usersDB.insertOne(USER_LOGIN);

      response = await chai.request(server).post('/login').send({ password: 'ukulele' });
    });

    it('Retorna um status code 401', () => {
      expect(response).to.have.status(401);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" deve ter valor "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
});
