const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp);
const { expect } = chai;

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('POST /users/admin', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  })

  describe('Será validado que o campo "name" é obrigatório', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
    });

    after(async () => {});

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Será validado que o campo "email" é obrigatório', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        password: '12345678'
      });
    });

    after(async () => {});

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Será validado que não é possível cadastrar usuário com o campo email inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'brunobatista@',
        password: '12345678'
      });
    });

    after(async () => {});

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Será validado que o campo "senha" é obrigatório', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'brunobatista@gmail.com',
      });
    });

    after(async () => {});

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Será validado que o campo "email" é único', () => {
    let response;

    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users')

      await usersCollection.insertOne({
        name: 'Erick Jacquin',
        email: 'erickjacquin@gmail.com',
        password: '12345678',
        role: 'user',
      })

      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
    });

    it('retorna código de status "409"', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Email already registered"', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });

  describe('Será validado que não é possível cadastrar um usuário admin sem o token', () => {
    let response;

    before(async () => {

      const token = '';
      
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({
          name: 'Lucas Ferreira',
          email: 'lucasferreira@gmail.com',
          password: 'vqv@2021'
        })
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "missing auth token"', () => {
      expect(response.body.message).to.be.equals('missing auth token');
    });

  });
});