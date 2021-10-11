const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { connect } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa o endpoint para listagem de receitas por ID', () => {
  describe('Quando a receita é encontrada com sucesso', () => {
    describe('A resposta', () => {
      const user = {
        name: 'Jake the Dog',
        email: 'jake@dog.com',
        password: 'adventureTime'
      };

      const { name: _, ...loginInfo } = user;

      const recipe = {
        name: 'Arroz Doce',
        ingredients: 'arroz, canela, leite, açucar',
        preparation: 'mexe tudo',
      };

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai.request(server).post('/login').send(loginInfo);
        const { body: { recipe: { _id } } } = await chai
          .request(server).post('/recipes').send(recipe).set({ authorization: token });
        response = await chai.request(server).get(`/recipes/${_id}`)
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Retorna o status 200', async () => {
        expect(response).to.have.status(200);
      });

      it('Retorna um objeto', () => {
       expect(response.body).to.be.an('object');
      });

      it('O objeto possui as chaves "_id", "name", "ingredients", "preparation", "userId"', () => {
        expect(response.body).to.have.all.keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    })
  });

  describe('Quando a receita não é encontrada', () => {
    describe('A resposta', () => {
      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        response = await chai.request(server).get(`/recipes/614b493bf1cc33b09882d049`)
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('Retorna o status 404', () => {
        expect(response).to.have.status(404);
      });

      it('Retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('Objeto contem a chave "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it(' A chave "message" possui o valor "recipe not found"', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });
  });

  describe('Quando o ID é inválido', () => {
    describe('A resposta', () => {
      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        response = await chai.request(server).get(`/recipes/999`)
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('Retorna o status 404', () => {
        expect(response).to.have.status(404);
      });

      it('Retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('Objeto contem a chave "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('A chave "message" possui o valor "recipe not found"', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });
  });
});