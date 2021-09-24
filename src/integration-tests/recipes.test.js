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
