const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { getconnectionMock } = require('./getConnection');

const server = require('../api/app');

const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando nao tem email', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Teste',
        password: 'senha123'
      });
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando nao tem name', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/users')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      });
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando nao tem password', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Teste',
        email: 'teste@teste.com'
      });
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando ja tem um usuario no banco', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    
      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'senha123',
          })

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Teste',
          email: 'teste@teste.com',
          password: 'senha123'
        });
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('quando consegue criar um user', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'senha123'
      });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
    });

    it('retorna o codigo de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('user');
    });
  });
});

describe('POST /users/admin', () => {
  describe('quando ja tem um usuario no banco', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    
      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertMany([{
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'senha123',
            role: 'admin'
          },{
            name: 'Teste02',
            email: 'teste02@teste.com',
            password: 'senha123',
            role: 'admin'
          }]);

        loginResponse = await chai.request(server)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: 'senha123'
        })
        .then((result) => result.body.token);
  
        response = await chai.request(server)
          .post('/users/admin')
          .send({
            name: 'Teste02',
            email: 'teste02@teste.com',
            password: 'senha123',
            role: 'admin'
          })
          .set('authorization', loginResponse);
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('quando o user nao é admin', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'senha123',
            role: 'user'
          })

      loginResponse = await chai.request(server)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      })
      .then((result) => result.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'Teste02',
          email: 'teste02@teste.com',
          password: 'senha123',
          role: 'admin'
        })
        .set('authorization', loginResponse);
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 403', () => {
      expect(response).to.have.status(403);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Only admins can register new admins"', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });

  describe('quando consegue cria um admin', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
            name: 'Teste',
            email: 'teste@teste.com',
            password: 'senha123',
            role: 'admin'
          })

      loginResponse = await chai.request(server)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      })
      .then((result) => result.body.token);

      response = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'Teste02',
          email: 'teste02@teste.com',
          password: 'senha123',
          role: 'admin'
        })
        .set('authorization', loginResponse);
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
    });

    it('retorna o codigo de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('user');
    });
  });
});
