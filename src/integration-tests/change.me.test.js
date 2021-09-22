const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
  describe('when is created', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
          .post('/users')
          .send({
              name: 'jane',
              email: 'jane@gmail.com',
              password: 'senha123'
          });
  });

    it('returns status code 201', () => {
      expect(response).to.have.status(201);
    });
  })
});
