const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../api/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /ping', () => {
  describe('Quando ocorre uma resposta do servidor:', () => {
    let response;
    before(async () => {
      response = await chai.request(server).get('/ping');
    });
    
    it('Deve retornar o http status 200 ', () => {
      expect(response).to.have.status(200);
    });

    it('Deve retornar um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('Deve retornar { message: "pong" } dentro do corpo da resposta', () => {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('pong');
    });
  })
})