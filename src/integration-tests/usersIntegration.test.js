const chai = require('chai');
const sinon = require('sinon');
const app = require('../api/app');
const { getConnection } = require('./mock');

const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users/', () => {
  describe('When we make an unsuccessful request', () => {
    describe('When the name, email or password fields are not informed', () => {
      let response;

      before(async () => {
        response = await chai.request(app).post('/users/').send({});
      });

      it('should return with HTTP 400 status', () => {
        expect(response).to.have.status(400);
      });

      it('must return an object in the body with the key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('should return the correct error message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('When fields are entered, but the email does not have the correct structure', () => {
      let response;

      before(async () => {
        response = await chai.request(app).post('/users/')
          .send({ name: 'Mateus', email: 'mateus', password: 'trybe2021' });
      });

      it('should return with HTTP 400 status', () => {
        expect(response).to.have.status(400);
      });

      it('must return an object in the body with the key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('should return the correct error message', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
    describe('When the user already exists in the database', () => {
      let connectionMock;
      let response;

      before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);

        await connectionMock.db('Cookmaster').collection('users')
          .insertOne({ name: 'Mateus', email: 'mateus@betrybe.com', password: 'trybe2021' });

        response = await chai.request(app).post('/users')
          .send({ name: 'Mateus', email: 'mateus@betrybe.com', password: 'trybe2021' });
      });

      after(async () => {
        MongoClient.connect.restore();
        await connectionMock.db('Cookmaster').collection('users').deleteOne({ email: 'mateus@betrybe.com' });
      });

      it('should return with HTTP status 409', () => {
        expect(response).to.have.status(409);
      });

      it('must return an object in the body with the key "message"', () => {
        expect(response.body).to.be.an('object').to.have.property('message');
      });

      it('should return the correct error message', () => {
        expect(response.body.message).to.be.equal('Email already registered');
      });
    });
  });
});