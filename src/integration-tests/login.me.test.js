const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const server = require('../api/app');
const { connection } = require('./connectionMock');

chai.use(chaiHttp);

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => MongoClient.connect.restore());

  describe('Verifica se é possível realizar login com sucesso', () => {
    let response = {};

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({
          name: 'userTest',
          email: 'test@test.com',
          password: '123456',
          role: 'user'
        });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@test.com',
          password: '123456',
        });
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um token', () => {
      expect(response.body).to.have.property('token');
    });
  });

  describe('Verifica se o campo email é obrigatório', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          password: '123456',
        });
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Verifica se o campo password é obrigatório', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'test@test.com',
        });
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
});
