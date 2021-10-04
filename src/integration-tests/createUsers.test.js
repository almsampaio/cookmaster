const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('POST /users', () => {
  const DBServer = new MongoMemoryServer();
  let db;

  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    db = connectionMock.db('Cookmaster');

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Casos de falha', () => {  
    describe('Quando não é passado o campo "name"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            email: 'teste@teste.com',
            password: '123456789'
          });
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('Quando não é passado o campo "email"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: 'Testador Testante',
            password: '123456789'
          });
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('Quando não é passado um e-mail válido no campo "email"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: 'Testador Testante',
            email: 'testatortestante@',
            password: '123456789'
          });
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('Quando não é passado o campo "password"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: 'Testador Testante',
            email: 'testatortestante@',
            password: '123456789'
          });
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('Quando o e-mail passado não é único', () => {
      let response;

      before(async () => {
        await chai.request(server)
          .post('/users')
          .send({
            name: 'Testador Testante',
            email: 'testatortestante@teste.com',
            password: '123456789'
          });

        response = await chai.request(server)
          .post('/users')
          .send({
            name: 'Testador Testante',
            email: 'testatortestante@teste.com',
            password: '123456789'
          });
      });

      after(async () => {
        db.collection('users').deleteMany({
          name: 'Testador Testante',
          email: 'testatortestante@teste.com',
          password: '123456789'
        })
      })

      it('retorna o código de status 409', () => {
        expect(response).to.have.status(409);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Email already registered');
      });
    });
  });

  describe('Casos de sucesso', () => {
    describe('É possivel cadastrar um usuário', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: 'Testador Testante',
            email: 'testatortestante@teste.com',
            password: '123456789'
          });
      });

      after(async () => {
        db.collection('users').deleteMany({
          name: 'Testador Testante',
          email: 'testatortestante@teste.com',
          password: '123456789'
        });
      });

      it('retorna o código de status 201', () => {
        expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "user"', () => {
        expect(response.body).to.have.property('user');
      });

      it('a propriedade "user" é um objeto', () => {
        expect(response.body.user).to.be.a('object');
      });

      it('a propriedade "user" ter as informações do usuário', () => {
        expect(response.body.user.name).to.be.equal('Testador Testante');
        expect(response.body.user.email).to.be.equal('testatortestante@teste.com');
        expect(response.body.user).to.have.property('_id');
        expect(response.body.user).to.have.property('role');
      });

      it('a propriedade "role" ter o valor user', () => {
        expect(response.body.user).to.have.property('role');
        expect(response.body.user.role).to.be.equal('user');
      });
    });
  });
});
