const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { expect } = chai;
chai.use(chaiHttp);

const USER_LOGIN = {
  email: 'xablau@email.com',
  password: 'xablau'
};


const RECIPE = {
  name: 'Pão de queijo',
  ingredients: 'Polvilho, leite, queijo',
  preparation: 'Forno',
};

let connection;

describe('Testes para a rota "/recipes"', () => {
  before(async () => {
    connection = await connectionMock();
    sinon.stub(MongoClient, 'connect').resolves(connection);
  });
  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Testes para adição de uma receita com sucesso', () => {
    let response;
    before(async () => {
    const usersDB = connection.db('Cookmaster').collection('users');
    await usersDB.deleteMany({});
    await usersDB.insertOne(USER_LOGIN);

    const recipesDB = connection.db('Cookmaster').collection('recipes');
    await recipesDB.deleteMany({});

    const token = await chai
      .request(server)
      .post('/login')
      .send(USER_LOGIN)
      .then((login) => login.body.token);

    response = await chai
      .request(server)
      .post('/recipes')
      .set('authorization', token)
      .send(RECIPE);
    });

    it('Retorna um status code 201', () => {
      expect(response).to.have.status(201);
    });

    it('O body deve ser um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('O body deve ter uma propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('"recipe" deve ter uma propriedade "name"', () => {
      expect(response.body.recipe).to.have.property('name');
    });

    it('"recipe" deve ter uma propriedade "ingredients"', () => {
      expect(response.body.recipe).to.have.property('ingredients');
    });

    it('"recipe" deve ter uma propriedade "preparation"', () => {
      expect(response.body.recipe).to.have.property('preparation');
    });

    it('"recipe" deve ter uma propriedade "userId"', () => {
      expect(response.body.recipe).to.have.property('userId');
    });
  });
});
