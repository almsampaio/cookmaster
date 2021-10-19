const mockConnection = require('./connectionMock');
const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const app = require('../api/app');

chai.use(chaiHttp);

const mockUser = {
  name: 'carlos',
  email: 'carlos@gmail.com',
  password: 'senha@123'
};

describe('Test users', () => {
  before( async () => {
    const bdVirtual = await mockConnection();
    sinon.stub(MongoClient, 'connect').resolves(bdVirtual);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('test x', async () => {
    const response = await chai.request(app).post('/users').send(mockUser);
    console.log(response);

    expect(response).to.have.status(201);
  });
});


