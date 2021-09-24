const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/app');

describe('When there is no token', () => {
  let response;

  before(async () => {
    response = await chai.request(server)
    .delete('/recipes/:id')
    .set('authorization', '')
  });

  it('Epect status 401', () => {
    expect(response).to.have.status(401);
  });
  it('Expect message to have proper content', () => {
    expect(response.body.message).to.be.equal('missing auth token');
  });
});

describe('Deleting a recipe', () => {
  let connectionMock;
  let response;

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

    const recipe = await recipesCollection.findOne({ name: 'food' });

    response = await chai.request(server)
      .delete(`/recipes/${ recipe._id }`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkY2U4NGFkMDVmMTM3MTBlZjUwZDkiLCJlbWFpbCI6InVzZXJAdHJ5YmUuY29tLmJyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzI0ODkxNzAsImV4cCI6MTYzMzA5Mzk3MH0.iWrpWGiX8cFBCCles_rKj3mdv2EgyINkf35NZq2EoVo')
  
    });
    
    after(() => {
      MongoClient.connect.restore();
    });

  it('Delete a recipe', async () => {
    expect(response).to.have.status(204);
  });
});
