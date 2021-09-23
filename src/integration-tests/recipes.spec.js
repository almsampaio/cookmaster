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
const INVALID_RECIPE = {
  ingredients: 'Frango uai',
  preparation: 'Muito versátil',
};


const userSetup = async (user, recipeObj) => {
  await chai.request(server).post('/users').send(user);
  const { body: { token } } = await chai.request(server)
    .post('/login')
    .send({ email: 'userName@email.com', password: '12345678' });
  const recipe = await chai.request(server)
    .post('/recipes')
    .set('authorization', token)
    .send(recipeObj);
  return recipe;
};

describe('POST /recipes', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Todos os dados são válidos', async () => {
    let response = {};

    before(async () => {
      response = await userSetup(VALID_NEW_USER, VALID_RECIPE);
    });

    it('Deve ter status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Deve retornar um objeto com as informações da nova receita', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('recipe');
      expect(response.body.recipe).to.have.property('name');
      expect(response.body.recipe).to.have.property('_id');
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe.name).to.be.equal('Frango');
    });
  });

  describe('Quando a receita não é valida', async () => {
    let response = {};
    before(async () => {
      response = await userSetup(INVALID_NEW_USER, INVALID_RECIPE);
    });
    it('Retorna o status 400', () => {
      expect(response).to.have.status(400);
    });
    it('Retorna a mensagem informando o erro', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});
