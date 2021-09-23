const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const getConnection = require('./connection');

chai.use(chaiHttp);
const { expect } = chai;

const VALID_NEW_USER = {
  name: 'userName',
  email: 'userName@email.com',
  password: '12345678',
};

const INVALID_NEW_USER = {
  name: 'userName',
  password: '12345678',
};

const ADD_USER = async (userObj) => chai.request(server).post('/users').send(userObj);
const LOGIN = async (payload) => chai.request(server).post('/login').send(payload);

describe('POST /users', () => {
  before( async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB); 
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é criado com sucesso', () => {
    let response = {};
    before( async () => {
      response = await chai.request(server)
        .post('/users')
        .send(VALID_NEW_USER);
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
      expect(response.body.user.name).to.be.equal('userName');
    });
  });
});
