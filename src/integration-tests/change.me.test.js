const chai = require('chai');
// const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const server = require('../api/server');

describe('Login test when there is no password or email ', () => {
  let response;
  before(async () => {
    response = await chai.request(server)
    .post('/login')
    .send({});
  });

  it('Status is 401', () => {
    expect(response).to.have.status(401);
  });
  it('Response body is an object', () => {
    expect(response.body).to.be.an('object');
  });
  it('Response body to have property message', () => {
    expect(response.body).to.have.property('message');
  });
  it('Response body to have property message with proper content', () => {
    expect(response.body.message).to.be.equals('All fields must be filled');
  });
});
