const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/server');

describe('Create recipe with no info', () => {
  let response;
  before(async () => {
    response = await chai.request(server)
    .post('/recipes')
    .send({});
  });
  it('Status to be 400', () => {
    expect(response).to.have.status(400);
  });
  it('Expect to be an object', () => {
    expect(response).to.be.an('object');
  });
  it('Response to have property message', () => {
    expect(response.body).to.have.property('message');
  });
  it('Message to have proper content', () => {
    expect(response.body.message).to.be.equal('Invalid entries. Try again.');
  });
});

describe('Create recipe', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });
  describe('Succesfully created', () => {
    let response;

    before(async () => {
      const usersCollection = await connectionMock.db('Cookmaster').collection('users');

      await usersCollection.insertOne({
        name: 'admin',
        email: 'admin@trybe.com.br',
        password: 'admin123',
        role: 'admin',
      });

      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkZDBkNjliODA2MzhhZWQ1Nzc2MDgiLCJlbWFpbCI6ImFkbWluQHRyeWJlLmNvbS5iciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzMjQ4OTcwMiwiZXhwIjoxNjMzMDk0NTAyfQ.88DEtfBl5Y6tGmY0isVeLOzz8djtnkMacaXTu4H3uwg')
      .send({
        name: 'user Food',
        ingredients: 'lots of salt',
        preparation: '1 hr boiling',
      });
    });
    it('Expect status 201', () => {
      expect(response).to.have.status(201);
    });
    it('Expect an object', () => {
      expect(response).to.be.an('object');
    });
  });
});
