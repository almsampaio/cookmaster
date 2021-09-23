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

const VALID_RECIPE = {
  name: 'Frango',
  ingredients: 'Frango uai',
  preparation: 'Muito versátil',
};

const INVALID_NEW_USER = {
  name: 'userName',
  password: '12345678',
};

const userSetup = async () => {
  await chai.request(server).post('/users').send(VALID_NEW_USER);
  const { body: { token } } = await chai.request(server)
    .post('/login')
    .send({ email: 'userName@email.com', password: '12345678' });
  const { body: recipeBody } = await chai.request(server)
    .post('/recipes')
    .set('Authentication', token)
    .send(VALID_RECIPE);
  return recipeBody;
};

describe('POST /recipes', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é passado uma receita válida', () => { });
});
