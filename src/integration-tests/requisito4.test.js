const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockDatabaseConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Requisito 4 - Testa endpoint para listagem de receitas', () => {
  describe('quando há produtos cadastrados', () => {
    describe('a resposta', () => {
      const recipe = {
        _id: '6168e8a1f78e125dd8891da1',
        name: 'Pizza frita',
        ingredients: 'pizza',
        preparation: 'só fritar',
        userId: '614b2d819fda6c5d6235ee6f'
      };

      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('recipes').insertOne(recipe);
        response = await chai.request(server).get('/recipes').send();
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 200', () => {
        expect(response).to.have.status(200)
      });

      it('retorna um array', () => {
      expect(response.body).to.be.an('array');
      });

      it('array contém objetos', () => {
        expect(response.body.every((el) => typeof el === 'object')).to.be.equal(true);
      });

      it('o objeto da receita possui as chaves "name", "ingredients", "preparation", "userId" e "_id"', () => {
        expect(response.body[0]).to.have.all.keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    });
  });

  describe('quuando não há produtos cadastrados', () => {
    describe('a resposta' , () => {
      let mockConnection;
      let response;

      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        response = await chai.request(server).get('/recipes').send();
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('retorna o status 200', () => {
        expect(response).to.have.status(200)
      });

      it('retorna um array', () => {
        expect(response.body).to.be.an('array');
      });

      it('o array é vazio', () => {
        expect(response.body).to.be.empty;
      });
    });
  });
}); 
