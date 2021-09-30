const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const { getConnection } = require('./connectionMock');
const server = require('../api/app');

const { expect } = chai;


chai.use(chaiHttp);

describe('Testa rota de cadastro de usuários', () => {
  let connectionMock = {};

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('quando é criado com sucesso', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Gustavo Sousa',
          email: 'gustavo@gmail.com',
          password: 'test1234',
        });
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
      expect(response.body.user.name).to.be.equal('Gustavo Sousa');
    });

    it('user deve ter o email cadastrado', () => {
      expect(response.body.user.email).to.be.equal('gustavo@gmail.com');
    });
  });

  describe('Quando há um erro', () => {
    let response = {};

    describe('Quando não é enviado um nome', () => {
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            email: 'gustavo@gmail.com',
            password: 'test1234',
          });
      });

      it('retorna código 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('objeto deve ter propriedade message', () => {
        expect(response.body).to.have.property('message');
      });

      it('verifica mensagem de erro', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
  });
});
