const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/app');

describe('Update Recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const usersCollection = await connectionMock.db('Cookmaster').collection('users');

    await usersCollection.insertOne({
      name: 'user',
      email: 'user@trybe.com.br',
      password: 'trybe123',
      role: 'user',
    });

    const { _id } = await usersCollection.findOne({ name: 'user' });

    const recipesCollection = await connectionMock.db('Cookmaster').collection('recipes');

    await recipesCollection.insertOne({
      name: 'food',
      ingredients: 'lots of salt',
      preparation: 'just eat it',
      userId: _id,
    });
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When there is no token', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .put('/recipes/:id')
      .set('authorization', '')
      .send({
        name: 'user Food',
        ingredients: 'lots of salt',
        preparation: '1 hr boiling',
      });
    });
    
    it('Status 401', () => {
      expect(response).to.have.status(401);
    });

    it('Expect message with proper content', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('When it is succesfuly updated', () => {
    let response;

    before(async () => {
      const recipesCollection = await connectionMock.db('Cookmaster').collection('recipes');

      const { _id } = await recipesCollection.findOne({ name: 'food' });

      response = await chai.request(server)
      .put(`/recipes/${ _id }`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkY2U4NGFkMDVmMTM3MTBlZjUwZDkiLCJlbWFpbCI6InVzZXJAdHJ5YmUuY29tLmJyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzI0ODkxNzAsImV4cCI6MTYzMzA5Mzk3MH0.iWrpWGiX8cFBCCles_rKj3mdv2EgyINkf35NZq2EoVo')
      .send({
        name: 'user Food',
        ingredients: 'lots of salt',
        preparation: '1 hr boiling',
      });
    });
    it('Status 200', () => {
      expect(response).to.have.status(200);
    });
    it('Return an object', () => {
      expect(response).to.be.an('object');
    });
  });
});
