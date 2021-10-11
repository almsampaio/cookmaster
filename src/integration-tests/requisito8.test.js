const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { connect } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa o endpoint para apagar uma receita', () => {
  describe('Quando uma receita é apagada com sucesso', () => {
    describe('A resposta', () => {
      const user = {
        name: 'Jake the Dog',
        email: 'jake@dog.com',
        password: 'adventureTime'
      };

      const { name: _, ...userLogInfo } = user;
      
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
        const { body: { token } } = await chai
          .request(server).post('/login').send(userLogInfo);
        const { body: { recipe: { _id } } } = await chai
          .request(server).post('/recipes').send(recipe).set({ authorization: token });
        response = await chai.request(server).delete(`/recipes/${_id}`).set({ authorization: token });
      });
      
      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });
      
      it('Retorna o status 204', async () => {
        expect(response).to.have.status(204);
      });
      
      it('Retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });
      
      it('O objeto é ser vazio', () => {
        expect(response.body).to.be.empty;
      });
    });
  });

  describe('Quando o ID é inválido', () => {
    describe('A resposta', () => {
      const user = {
        name: 'Jake the Dog',
        email: 'jake@dog.com',
        password: 'adventureTime'
      };

      const { name: _, ...userLogInfo } = user;
      
      const recipe = {
        name: 'Arroz Doce',
        ingredients: 'arroz, canela, leite, açucar',
        preparation: 'mexe tudo',
      };

      const updateRecipe = {
        name: 'Panquecas',
        ingredients: 'Leite, ovo, fermento, farinha',
        preparation: 'google',
      };

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai
          .request(server).post('/login').send(userLogInfo);
        response = await chai.request(server).delete(`/recipes/999`).set({ authorization: token });
      });
      
      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Retorna o status 404', () => {
        expect(response).to.have.status(404);
      });

      it('Retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('Objeto possui a chave "message"', () => {
        expect(response.body).to.have.all.keys('message');
      });

      it('A chave "message" possui o valor "recipe not found', () => {
        expect(response.body.message).to.be.equal('jwt malformed');
      });
    });
  });
});