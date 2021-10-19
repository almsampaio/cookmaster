const mockConnection = require('./connectionMock');
const chai = require('chai');
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const chaiHttp = require('chai-http');

const app = require('../api/app');

chai.use(chaiHttp);

describe('test recipes endpoint', () => {
  
  const mockRecipe = {
    name: 'string',
    ingredients: 'string',
    preparation: 'string'
  }

  before( async () => {
    const bdVirtual = await mockConnection();
    sinon.stub(MongoClient, 'connect').resolves(bdVirtual);
  });

  after(() => {
    MongoClient.connect.restore();
  });


  it('test get all recipes', async () => {
    const response = await chai.request(app).get('/recipes').send();

    expect(response).to.have.status(200)
  });

  it('test get all recipes', async () => {
    const response = await chai.request(app).post('/recipes').send(mockRecipe);

    expect(response).to.have.status(401)
  });
});
