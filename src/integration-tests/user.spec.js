const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const getConnection = require('./connection');

const { } = require('./recipes.spec');

chai.use(chaiHttp);
const { expect } = chai;

const VALID_NEW_USER2 = {
  name: 'userName2',
  email: 'userName@email2.com',
  password: '12345678',
};

describe('POST /users', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é criado com sucesso', () => {
    let response = {};
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send(VALID_NEW_USER2);
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto com as infos do novo usuario, na chave user', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('name');
      expect(response.body.user).to.have.property('_id');
      expect(response.body.user).not.to.have.property('password');
      expect(response.body.user.name).to.be.equal('userName2');
    });
  });
});

describe('POST /users/admin', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Só outros admins podem criar um admin', async () => {
    let response = {};
    before(async () => {
      await chai.request(server).post('/users').send(VALID_NEW_USER2);
      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({ email: 'userName@email.com', password: '12345678' });
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send(VALID_NEW_USER2);
    });

    it('Retorna codigo 403', async () => {
      expect(response).to.have.status(403);
    });

    it('Retorna mensagem de erro', async () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
});
