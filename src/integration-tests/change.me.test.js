const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {

  describe('quando é criado com sucesso', () => {
    let response = {};

    const DBServer = new MongoMemoryServer();
    before(async () => {
      const URLMock = await DBServer.getUri();
            const connectionMock = await MongoClient.connect(URLMock,
                { useNewUrlParser: true, useUnifiedTopology: true }
            );

            sinon.stub(MongoClient, 'connect')
                .resolves(connectionMock);
      response = await chai.request(server)
          .post('/users')
          .send({
              name: 'luan',
              email: 'luan@luan.com',
              password: 'senha123'
          });
    });
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });


    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna a a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('o body não está vazio', () => {
      expect(response.body).to.be.not.empty;
    });

    it('a propriedade "users" possui o campo "name"',
      () => {
        expect(response.body.user)
          .to.have.property('name');
      });
    it('a propriedade "users" possui o campo "email"',
    () => {
      expect(response.body.user)
        .to.have.property('email');
    });
  });
});

