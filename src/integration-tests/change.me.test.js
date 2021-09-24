const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../api/server')
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
chai.use(chaiHttp)
const { expect } = chai

describe('Testando cadastro de um usuário', () => {
  describe('Quando criado com sucesso', () => {
    let response = {};
    const DBServer = new MongoMemoryServer();
    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      sinon.stub(MongoClient, 'connect').resolves(connectionMock)

      response = await chai.request(server)
        .post('/users')
        .send({
          "name": "Maria",
          "email": "maria@test.com",
          "password": "senhasupersecreta"
        })
    })
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    })
    it('retorna um objeto', () => {
      expect(response.body).to.be('object')
    })
    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user')
    })
    it('a propriedade "user" possui as informações do usuário cadastrado', () => {
      expect(response.body.user.role).to.be.equal('user')
    })
  })
});
