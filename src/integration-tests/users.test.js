const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');

const userModel = require('../models/userModel');

const DBServer = new MongoMemoryServer();

describe('POST /users', () => {
  describe('quando utiliza dados inválidos', () => {
    describe('com um nome inválido', () => {
      let response = {}
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: "",
            email: "joao@email.com",
            password: "123456"
          })
      });

      it('retorna o código 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna uma mensagem de erro', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('com um email inválido', () => {
      let response = {}
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: "joao",
            email: "joao",
            password: "123456"
          })
      });

      it('retorna o código 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna uma mensagem de erro', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('com um password inválido', () => {
      let response = {}
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: "joao",
            email: "joao@email.com",
            password: ""
          })
      });

      it('retorna o código 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna uma mensagem de erro', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
  });

  describe('quando o usuário já existe', () => {
    let repeatedUser = {}
    let correctUser = {}
    before(async () => {
      // mocking DB in memory
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      correctUser = await chai.request(server)
        .post('/users')
        .send({
          name: 'joao',
          email: 'joao@email.com',
          password: '123456789'
        });

      repeatedUser = await chai.request(server)
        .post('/users')
        .send({
          name: 'joao',
          email: 'joao@email.com',
          password: '123456789'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o status 409', () => {
      expect(repeatedUser).to.have.status(409)
    });

    it('retorna mensagem especifica', () => {
      expect(repeatedUser.body.message).to.be.equal('Email already registered')
    });
  });
});

describe('POST /users/admin', () => {
  describe('quando um usuário não logado tenta adicionar um admin', () => {
    let response = {};
    before(async () => {
      // mocking DB in memory
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'joao',
          email: 'joao@email.com',
          password: '123456',
        })
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna um código 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna uma mensagem especifica', () => {
      expect(response.body.message).to.equal('missing auth token');
    });
  });

  describe('quando um usuário logado, porém não admin, tenta adicionar outro admin', () => {
  });
});