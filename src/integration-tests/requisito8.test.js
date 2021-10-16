const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockDatabaseConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Requisito 8 - Testa o endpoint para apagar uma receita', () => {
  describe('quando uma receita é apagada com sucesso', () => {
    describe('a resposta', () => {
      const user = {
        name: 'Cole the Cornstart',
        email: 'cornstars@corn.com',
        password: 'coleCaseIh9250'
      };

      const { name: _, ...userLogInfo } = user;

      const recipe = {
        name: 'Pizza frita',
        ingredients: 'pizza',
        preparation: 'só fritar',
      };

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await getConnection();
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

      it('retorna o status 204', async () => {
        expect(response).to.have.status(204);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto é ser vazio', () => {
        expect(response.body).to.be.empty;
      });
    });
  });
});
