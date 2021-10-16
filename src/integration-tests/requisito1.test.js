const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockDatabaseConnection');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Requisito 1 - Teste criação de usuário', () => {
  describe('quando criado com sucesso', () => {
    describe('a resposta' , () => {
      const userRequest = {
        name: 'Carlos Caramelo',
        email: 'carlao@gmail.com',
        password: 'caramelo1999'
      };

      let response;

      before(async () => {
        const mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        response = await chai.request(server).post('/users').send(userRequest);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('retorna o status 201', () => {
        expect(response).to.have.status(201);
      });

      it('é um objeto', () => {
        expect(response).to.be.an('object');
      });

      it('o objeto contém uma chave "user"', () => {
        expect(response.body).to.have.property('user');
      });

      it('a chave "user" contem as propriedades "name", "email", "role" e "_id"', () => {
        expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
      });

      it('a chave "role" deve possuir o valor "user"', () => {
        expect(response.body.user.role).to.be.equal('user');
      });
    });
  });

  describe('quando o email cadastrado já existe', () => {
    describe('a resposta', () => {
      const userRequest = {
        name: 'Carlos Caramelo',
        email: 'carlao@gmail.com',
        password: 'caramelo1999'
      };

      let response;
      let mockConnection;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(userRequest);
        response = await chai.request(server).post('/users').send(userRequest);
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status', () => {
        expect(response).to.have.status(409);
      });

      it('é um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('contém a propriedade "message"', () => {
        expect(response.body).to.have.property('message');       
      });

      it('"message" contém a mensagem de erro "Email already registered', () => {
       expect(response.body.message).to.be.equals('Email already registered');
      });
    });
  });

  describe('quando há algum erro no body da request', () => {
    describe('a resposta', () => {
      const userRequest = {
        name: '',
        email: 'xesquedele.com.br',
        password: 'xamaaaaa'
      };

      let response;
      let mockConnection;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        response = await chai.request(server).post('/users').send(userRequest);
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('retorna o status 400', () => {
        expect(response).to.have.status(400);
      });

      it('é um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('contém a propriedade "message"', () => {
        expect(response.body).to.have.property('message');       
      });

      it('"message" contém a mensagem de erro "Invalid entries. Try again."', () => {
       expect(response.body.message).to.be.equals('Invalid entries. Try again.');
      });
    });
  });
});
