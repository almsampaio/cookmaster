const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');

const chaiHttp = require('chai-http');
const { getConnection } = require('./connectionMock');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando os campos nome, email e password não são informados', () => {
    let response;

    before(async() => {
      response = await chai.request(app).post('/users').send({})
    })

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta tem a proproedade "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('a propriedade "message" possui a msg de erro adequada', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando o usuário já possui cadastro no banco', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: "Francisco", email: "fran@gmail.com", password: "102030" });

      response = await chai.request(app)
        .post('/users')
        .send({ name: "Francisco", email: "fran@gmail.com", password: "102030" });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster').collection('users')
        .deleteOne({ name: 'Francisco' })
    });

    it('retorna o código de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta tem a proproedade "message"', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('a propriedade "message" possui a msg de erro adequada', () => {
      expect(response.body.message).to.be.equal('Email already registered')
    });
  });

  describe('quando o usuário é cadastrado com sucesso', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(app)
        .post('/users')
        .send({ name: "Francisco", email: "fran@gmail.com", password: "102030" });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta tem a propriedade "user"', () => {
      expect(response.body).to.have.a.property('user');
    });

    it('o objeto "user" tem as propriedades "name", "email", "role" e "_id"', () => {
      expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    });
  });
});
