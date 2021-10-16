const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const server = require('../api/server');

const { MongoClient, ObjectId } = require('mongodb');
const { getConnection } = require('./mockDatabaseConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Requisito 9 - Testa o endpoint de cadastro de imagem de receita', () => {
  describe('quando o cadastro é feito com sucesso', () => {
    describe('a resposta', () => {
      const user = {
        name: 'Grand Chef',
        email: 'chef@chef.com',
        password: 'dale'
      };

      const { name: _, ...userLoginInfo } = user;

      const recipe = {
        name: 'Mousee',
        ingredients: 'nao sei',
        preparation: 'qualquer coisa',
      };

      let mockConnection;
      let response;
      before(async () => {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        const { body: { token } } = await chai.request(server).post('/login').send(userLoginInfo);
        const { insertedId } = await mockConnection.db('Cookmaster').collection('recipe').insertOne(recipe);
        response = await chai
          .request(server)
          .put(`/recipes/${insertedId}/image`)
          .set({ authorization: token })
          .attach('image', fs.readFileSync(path.join(__dirname, '..', 'uploads', 'ratinho.jpg')), `${insertedId}.jpg`);
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipe').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 200', async () => {
        expect(response).to.have.status(200);
      });
    });   
  });
});
