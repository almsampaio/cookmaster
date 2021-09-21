const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');

chai.use(chaiHttp);
const { expect } = chai;

const server = require('../api/server');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('POST /users', () => {

  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock); // cria uma conexão mocada para nao usar o BD de verdade
  })

  after(() => {
    MongoClient.connect.restore();
  })

  describe('Quando não é passada pessoa usuária, senha e e-mail', () => {

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({});
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    })

    it('objeto da resposta possui a propriedade "message"', () => {
      expect(response).to.have.property('message');
    })

    it('message tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
  })

  describe('Quando já existe o usuario cadastrado', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        name: 'user-fake',
        password: 'senha-fake',
        email: 'email-fake',
      });

      response = await chai.request(server)
        .get('/users')
        .send({
          name: 'user-fake',
          password: 'senha-fake',
          email: 'email-fake',
        });
    });

    it('retorna o status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    })

    it('objeto da resposta possui a propriedade "message"', () => {
      expect(response).to.have.property('message');
    })

    it('message tem o valor "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    })
  })

  describe('Quando o usuário é cadastrado com sucesso', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .get('/users')
        .send({
          name: 'user-fake',
          password: 'senha-fake',
          email: 'email-fake',
        });
    });

    it('retorna o status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    })

    it('objeto da resposta possui a propriedade "user"', () => {
      expect(response).to.have.property('user');
    })

    it('propriedade user possui "role" com valor "user"', () => {
      expect(response.user.role).to.be.equal('user');
    })
  })
});
