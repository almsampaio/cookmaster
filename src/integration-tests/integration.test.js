const { MongoClient } = require('mongodb');
const chai = require('chai');
const sinon = require('sinon');

const { getConnection } = require('./connectionMock');
const server = require('../api/app');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  "name": "Adelino Junior",
  "email": "adelino@gmail.com",
  "password": "123456"
}

describe('Criacao de um usuario POST /users', () => {

  describe('Quando cria um usuario com sucesso', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Adelino Junior",
          "email": "adelino@gmail.com",
          "password": "123456"
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Esperar que o retorno do body tenha a propriedade "user"', () => {
      expect(response.body).to.be.property('user');
      expect(response.body).to.be.an('object');
    })
    it('Esperar que o retorno do body.user tenha a propriedade "name"', () => {
      console.log(response);
      expect(response.body.user).to.be.property('name');
      expect(response.body.user.name).to.be.equal('Adelino Junior');
    })
    it('Esperar que o retorno do body.user tenha a propriedade "email"', () => {
      expect(response.body.user).to.be.property('email');
      expect(response.body.user.email).to.be.equal('adelino@gmail.com');
    })
    it('Esperar que o retorno do body.user tenha a propriedade "_id"', () => {
      expect(response.body.user).to.be.property('_id');
      expect(response.body.user['_id']).to.be.a('string');
    })
    it('Esperar que o retorno do body.user tenha a propriedade "role"', () => {
      expect(response.body.user).to.be.property('role');
      expect(response.body.user.role).to.be.equal('user');
    })
    it('Espera que o status seja "201"', () => {
      expect(response).to.have.status(201);
    })
    it('Espera que o status seja "201"', () => {
      expect(response).to.have.status(201);
    })
  });
  describe('Erro na criacao de usuario', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      connectionMock.db('Cookmater').collection('users').insertOne(userMock);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Espera que o campo "name" seja passado', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'adelinojunior@gmail.com', password: '123456' });

      expect(response).to.have.status(400);
      expect(response.body).to.be.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
    it('Espera que o campo "password" seja passado', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ email: 'adelinojunior@gmail.com', name: 'Adelino Junior' });

      expect(response).to.have.status(400);
      expect(response.body).to.be.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
    it('Espera que o campo "email" seja passado', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({ password: '123456', name: 'Adelino Junior' });

      expect(response).to.have.status(400);
      expect(response.body).to.be.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
    it('Quando tenta cadastrar um usuario com email ja existente', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Adelino Junior",
          "email": "adelino@gmail.com",
          "password": "123456"
        });
      
      expect(response.body).to.be.property('message');
      expect(response.body.message).to.be.equal('Email already registered');
      expect(response).to.have.status(409);
    })
  });
});