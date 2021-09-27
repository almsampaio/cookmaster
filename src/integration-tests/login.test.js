const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');

describe('POST /login', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });

  describe('quando não há email ou senha', () => {
    let response = {}
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({email: '', password: ''});
    });

    it('recebe um status 401', () => {
      expect(response).to.have.status(401);
    });
    it('recebe uma mensagem', () => {
      expect(response.body.message).to.equal('All fields must be filled')
    });
  });
  describe('quando não há usuário ou a senha é inválida', () => {
    let response = {};
    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({email: 'fake', password: 'fake'});
    })
    it('recebe um status 401', () => {
      expect(response).to.have.status(401);
    });
    it('recebe uma mensagem', () => {
      expect(response.body.message).to.equal('Incorrect username or password')
    });
  });
  describe('quando o login é feito com sucesso', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'joao',
        email: 'joao@email.com',
        password: '123456'
      })

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'joao@email.com',
          password: '123456'
        })

    })
    it('retorna um status 200', () => {
      expect(response).to.have.status(200)
    });
    it('retorna um token', () => {
      expect(response.body).to.have.property('token')
    });
  });
})


