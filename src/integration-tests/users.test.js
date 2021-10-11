const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { expect } = chai;
chai.use(chaiHttp);

const USER = {
  name: 'Xablau',
  email: 'xablau@email.com',
  password: 'ukulele',
};

const INVALID_NAME = {
  name: 1111,
  email: 'xablau@email.com',
  password: 'xablau',
};

const INVALID_EMAIL = {
  name: 'Xablau',
  email: 'xablauemail.com',
  password: 'xablau',
};

let connection;

describe('Testes para a rota "/users"', () => {
  before(async () => {
    connection = await connectionMock();
    sinon.stub(MongoClient, 'connect').resolves(connection);
  });
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Testes para a adição de um usuário', () => {
    let response;
    before(async () => {
      const usersDB = connection.db('Cookmaster').collection('users');
      await usersDB.deleteMany({});
      response = await chai.request(server).post('/users').send(USER);
    });

    it('Retorna um status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('"user" deve ter uma propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('"user" deve ter uma propriedade "email"', () => {
      expect(response.body.user).to.have.property('email');
    });

    it('"user" deve ter uma propriedade "role"', () => {
      expect(response.body.user).to.have.property('role');
    });

    it('"role" deve ter valor "user"', () => {
      expect(response.body.user.role).to.be.equal('user');
    });

    it('"user" deve ter a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });
  });

  describe('Testes para a adição de um usuário com "name" inválido', () => {
    let response;
    before(async () => {
      const usersDB = connection.db('Cookmaster').collection('users');
      await usersDB.deleteMany({});
      response = await chai.request(server).post('/users').send(INVALID_NAME);
    });

    it('Retorna um status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" deve ter valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Testes para a adição de um usuário com "email" inválido', () => {
    let response;
    before(async () => {
      const usersDB = connection.db('Cookmaster').collection('users');
      await usersDB.deleteMany({});
      response = await chai.request(server).post('/users').send(INVALID_EMAIL);
    });

    it('Retorna um status code 400', () => {
      expect(response).to.have.status(400);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('"message" deve ter valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});
