const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../api/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /', () => {
  describe('Quando ocorre uma resposta do servidor:', () => {
    let response;
    before(async () => {
      response = await chai.request(server).get('/');
    });
    
    it('Deve retornar apenas um objeto', () => {
      expect(response).to.be.a('object');
    });
  })
})