const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Verifica a rota GET "/"', () => {
  let response;
  before(async () => {
    response = await chai.request(server).get('/').send();
  });

  it('retorna o status 200', () => {
    expect(response).to.have.status(200);
  })
});