const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/server');

describe('Get recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const recipesCollection = await connectionMock.db('Cookmaster').collection('recipes');

    await recipesCollection.insertOne({
      name: 'food',
      ingredients: 'lots of salt',
      preparation: 'just eat it',
      userId: 'admin',
    });
  });

  after(() => {
    MongoClient.connect.restore();
  });
  describe('Get all', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .get('/recipes')
    });

    it('Expect status 200', () => {
      expect(response).to.have.status(200);
    });
  });

  describe('Get by ID', () => {
    describe('When recipe not found', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
        .get('/recipes/:id')
      });

      it('Status 404', () => {
        expect(response).to.have.status(404);
      });
      
      it('Expect message with proper content', () => {
        expect(response.body.message).to.be.equal('recipe not found');
      });
    });

    describe('Successfully found', () => {
      let response;

      before(async () => {
        const recipesCollection = await connectionMock.db('Cookmaster').collection('recipes');

        const { _id } = await recipesCollection.findOne({ name: 'food' });
        console.log(_id);
        response = await chai.request(server)
        .get(`/recipes/${ _id }`);
      });

      it('Expect respone status 200', () => {
        expect(response).to.have.status(200);
      });
    });
  });
});
