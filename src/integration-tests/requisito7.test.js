const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { connect } = require('./mockConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testa endpoint para atualização de receita cadastrada', () => {
  describe('quando a atualização é feita com sucesso', () => {
    describe('resposta', () => {
      // usuario no banco
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
        const { body: { recipe: { _id } } } = await chai
          .request(server).post('/recipes').send(recipe).set({ authorization: token });
        response = await chai.request(server).put(`/recipes/${_id}`).send(updateRecipe).set({ authorization: token });
      });
      
      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });
      
      it('retorna o status 200', async () => {
        expect(response).to.have.status(200);
      });
      
      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });
      
      it('possui as chaves "name", "ingredients", "preparation", "userId", "_id"', () => {
        expect(response.body).to.have.all.keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    });
  });

  describe('quando a receita não pertence ao usuário', () => {
    describe('a resposta', () => {
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
        userId: '614b2d819fda6c5d6235ee6f'
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
        const { insertedId: _id} = await mockConnection.db('Cookmaster').collection('recipes').insertOne(recipe);
        response = await chai.request(server).put(`/recipes/${_id}`).send(updateRecipe).set({ authorization: token });
      });
      
      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });
      
      it('retorna o status 401', async () => {
        expect(response).to.have.status(401);
      });
      
      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });
      
      it('possui a chave "message"', () => {
        expect(response.body).to.have.all.keys('message');
      });

      it('"message" deve possuir o valor "unauthorized"', () => {
        expect(response.body.message).to.be.equal('unauthorized');
      });
    });
  });

  describe('quando o token é inválido', () => {
    describe('a resposta' , () => {
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
        userId: '614b2d819fda6c5d6235ee6f'
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
        const { insertedId: _id} = await mockConnection.db('Cookmaster').collection('recipes').insertOne(recipe);
        response = await chai.request(server).put(`/recipes/${_id}`).send(updateRecipe).set({ authorization: 'invalidToken' });
      });
      
      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });
      
      it('retorna o status 401', async () => {
        expect(response).to.have.status(401);
      });
      
      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });
      
      it('possui a chave "message"', () => {
        expect(response.body).to.have.all.keys('message');
      });

      it('"message" deve possuir o valor "jwt malformed"', () => {
        expect(response.body.message).to.be.equal('jwt malformed');
      });
    })
  });
});