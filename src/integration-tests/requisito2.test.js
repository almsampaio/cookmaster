const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/server');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockDatabaseConnection');
const { expect } = require('chai');
chai.use(chaiHttp);

describe('Requisito 2 - Testa o endpoint para Login de usuários', () => {
  describe('quando o login é efetuado com sucesso', () => {
    describe('a resposta', () => {
      const user = {
        name: 'Carlos Caramelo',
        email: 'carlao@gmail.com',
        password: 'caramelo1999'
      };

      const { name: _, ...userLogInfo }  = user;
      let response;
      let mockConnection;

      before(async () =>  {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        response = await chai.request(server).post('/login').send(userLogInfo);
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 200', () => {
       expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');      
      });

      it('o objeto contém a chave "token"', () => {
       expect(response.body).to.have.property('token');
      });
    });
  });

  describe('quando "email" ou "password" não são informados', () => {
    describe('a resposta', () => {
      let response;
      let mockConnection;

      before(async () =>  {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        response = await chai.request(server).post('/login').send({});
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('retorna o status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');      

      });

      it('contém uma propriedade "message"', () => {
        expect(response.body).to.have.property('message');

      });

      it('"message" possui o valor "All fields must be filled"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });
  });

  describe('quando usuário não encontrado ou password inválido', () => {
    describe('a resposta', () => {
      const user = {
        name: 'Carlos Caramelo',
        email: 'carlao@gmail.com',
        password: 'caramelo1999'
      };

      const notValidInfo = {
        email: 'not@found.com',
        password: 'not_found',
      }

      let response;
      let mockConnection;

      before(async () =>  {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        response = await chai.request(server).post('/login').send(notValidInfo);
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });
      it('retorna o status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');
      });

      it('objeto contém a chave "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('"message" possui o valor "Incorrect username or password"', () => {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    });
  });
})
