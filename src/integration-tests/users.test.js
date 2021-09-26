const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');

const server = require('../api/app');

chai.use(chaiHttp);

describe('POST /users', () => {
  describe('Ao não informar o name', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect( URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

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
      await DBServer.stop();
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
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect( URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

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
      await DBServer.stop();
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
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect( URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

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
      await DBServer.stop();
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
    const DBServer = new MongoMemoryServer();
    const data = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
    };

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect( URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

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
      // await DBServer.stop();
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
    const DBServer = new MongoMemoryServer();
    const data = {
      name: 'teste',
      email: 'testando@email.com',
      password: '12345678',
    };

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect( URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send(data);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
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
