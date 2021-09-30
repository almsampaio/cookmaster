const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');

const { expect } = chai;


chai.use(chaiHttp);

describe('Testa rota de cadastro de usuários', () => {
  describe('quando é criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Gustavo Sousa',
          email: 'gustavohl9821@gmail.com',
          password: 'test1234',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna código 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('objeto deve ter propriedade user', () => {
      expect(response.body).to.have.property('user');
    });

    it('user deve ter o nome cadastrado', () => {
      expect(response.body.user.name).to.be.equal('');
    });

    it('user deve ter o email cadastrado', () => {
      expect(response.body.user.email).to.be.equal('');
    });
  })
})