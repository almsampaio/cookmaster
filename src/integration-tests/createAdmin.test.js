const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockConnection');

const { expect } = chai;

const server = require('../api/server');

describe('Create a new admin user', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When is not an admin user logged in', () => {
    let response;

    before(async () => {
      const usersCollection = await connectionMock.db('Cookmaster').collection('users');

      await usersCollection.insertOne({
        name: 'user',
        email: 'user@trybe.com.br',
        password: 'trybe123',
        role: 'user',
      });

      response = await chai.request(server)
      .post('/users/admin')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkY2U4NGFkMDVmMTM3MTBlZjUwZDkiLCJlbWFpbCI6InVzZXJAdHJ5YmUuY29tLmJyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzI0ODkxNzAsImV4cCI6MTYzMzA5Mzk3MH0.iWrpWGiX8cFBCCles_rKj3mdv2EgyINkf35NZq2EoVo')
      .send({
        name: 'userAdmin',
        email: 'userAdmin@trybe.com.br',
        password: 'trybe123',
      });
    });

    it('Return status 403', () => {
      expect(response).to.have.status(403);
    });

    it('Return an proper message', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
  
  describe('When admin is created succesfully', () => {
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
      .post('/users/admin')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRkZDBkNjliODA2MzhhZWQ1Nzc2MDgiLCJlbWFpbCI6ImFkbWluQHRyeWJlLmNvbS5iciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzMjQ4OTcwMiwiZXhwIjoxNjMzMDk0NTAyfQ.88DEtfBl5Y6tGmY0isVeLOzz8djtnkMacaXTu4H3uwg')
      .send({
        name: 'userAdmin',
        email: 'userAdmin@trybe.com.br',
        password: 'trybe123',
      });
    });
    
    it('Expect status 201', () => {
      expect(response).to.have.status(201);
    });
    it('Return is an object', () => {
      expect(response).to.be.an('object');
    });
  });
});
