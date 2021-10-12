const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { connect } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa a criação de um novo admin', () => {
  describe('quando criado com sucesso', () => {
    describe('a resposta' , () => {
      const user = {
        name: 'Carl Sagan',
        email: 'sagan@nasa.com',
        password: 'stardust',
        role: 'admin',
      };

      const { name, role, ...loginInfo } = user;

      const newAdmin = {
        name: 'Ayrton Senna',
        email: 'ayrton@senna.com',
        password: 'theBoss',
        role: 'admin',
      }

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai
          .request(server).post('/login').send(loginInfo);
        response = await chai.request(server).post('/users/admin').send(newAdmin).set({ authorization: token });
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
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

      it('a chave "role" deve possuir o valor "admin"', () => {
        expect(response.body.user.role).to.be.equal('admin');
      });
    });
  });

  describe('quando o usuario logado não é um admin', () => {
    describe('a resposta', () => {
      const user = {
        name: 'Carl Sagan',
        email: 'sagan@nasa.com',
        password: 'stardust',
        role: 'user',
      };

      const { name, role, ...loginInfo } = user;

      const newAdmin = {
        name: 'Ayrton Senna',
        email: 'ayrton@senna.com',
        password: 'theBoss',
        role: 'admin',
      }

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai
          .request(server).post('/login').send(loginInfo);
        response = await chai.request(server).post('/users/admin').send(newAdmin).set({ authorization: token });
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 403', () => {
        expect(response).to.have.status(403);
        console.log(response.body);
      });

      it('é um objeto', () => {
        expect(response).to.be.an('object');
      });

      it('o objeto contém uma chave "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('"message" deve possuir o valor "Only admins can register new admins"', () => {
        expect(response.body.message).to.be.equal('Only admins can register new admins');
      });
    })
  });
});