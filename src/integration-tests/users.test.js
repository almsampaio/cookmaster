const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const { connection } = require('./connectionMock');

const server = require('../api/app');

chai.use(chaiHttp);

describe('POST /users', () => {
  describe('Ao não informar o name', () => {
    let response = {};

    before(async () => {
      const connectionMock = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'teste@email.com',
          password: '12345678',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Ao não informar o email', () => {
    let response = {};

    before(async () => {
      const connectionMock = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'teste',
          password: '12345678',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Ao não informar o password', () => {
    let response = {};

    before(async () => {
      const connectionMock = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'teste',
          email: 'teste@email.com',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Ao informar um email repetido', () => {
    let response = {};
    const data = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
    };

    before(async () => {
      const connectionMock = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({
          name: 'teste2',
          email: 'teste@email.com',
          password: '123456',
        });

      response = await chai.request(server)
        .post('/users')
        .send(data);
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna mensagem', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('Ao informar todos os dados corretamente', () => {
    let response = {};
    const data = {
      name: 'teste',
      email: 'testando@email.com',
      password: '12345678',
    };

    before(async () => {
      const connectionMock = await connection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send(data);
    });

    after(async () => {
      MongoClient.connect.restore();
    });
    
    it('retorna status 200', () => {
      expect(response).to.have.status(201);
    });

    it('retorna o usuário criado', () => {
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.not.have.property('password');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.deep.include({ name: data.name });
      expect(response.body.user).to.deep.include({ email: data.email });
      expect(response.body.user).to.deep.include({ role: 'user' });
    });
  });
});

describe('POST /users/admin', () => {
  let connectionMock;

  before( async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  describe('Ao informar todos os dados corretamente', () => {
    let response = {};
    const data = {
      name: 'teste',
      email: 'admin@root.com',
      password: '12345678',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'admin', email: 'admin@admin.com', password: '123456', role: 'admin' });

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: '123456',
        });

      const token = body.token;

      response = await chai.request(server)
        .post('/users/admin')
        .set('Authorization', token)
        .send(data);
    });
    
    it('retorna status 200', () => {
      expect(response).to.have.status(201);
    });

    it('retorna o usuário criado', () => {
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.not.have.property('password');
      expect(response.body.user).to.have.property('_id');
      expect(response.body.user).to.deep.include({ name: data.name });
      expect(response.body.user).to.deep.include({ email: data.email });
      expect(response.body.user).to.deep.include({ role: 'admin' });
    });
  });

  describe('Ao utilizar um usuário com a role "user"', () => {
    let response = {};
    const data = {
      name: 'teste2',
      email: 'admin2@root.com',
      password: '12345678',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne({ name: 'admin', email: 'user@admin.com', password: '123456', role: 'user' });

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: 'user@admin.com',
          password: '123456',
        });

      const token = body.token;

      response = await chai.request(server)
        .post('/users/admin')
        .set('Authorization', token)
        .send(data);
    });
    
    it('retorna status 403', () => {
      expect(response).to.have.status(403);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
});
