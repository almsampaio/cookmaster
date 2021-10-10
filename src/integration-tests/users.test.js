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
  });
});
