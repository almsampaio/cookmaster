const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');
const { getConnection } = require('./connectionMock');

chai.use(chaiHTTP);

const { expect } = chai;

describe('POST /login', () => {
  let db;

  before(async () => {
    const connectionMock = await getConnection();

    db = connectionMock.db('Cookmaster');

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Casos de falha', () => {
    before(async () => {
      await chai.request(server)
        .post('/users')
        .send({
          name: 'Yarpen Zigrin',
          email: 'yarpenzigrin@anao.com',
          password: '123456789'
        });
    });

    after(async () => {
      db.collection('users').deleteMany({
        name: 'Yarpen Zigrin',
        email: 'yarpenzigrin@anao.com',
        password: '123456789'
      })
    })

    describe('Quando não é passado o campo "email"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            password: '123456789'
          });
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "All fields must be filled"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('Quando não é passado o campo "password"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            email: 'yarpenzigrin@anao.com',
          });
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "All fields must be filled"', () => {
        expect(response.body.message).to.be.equal('All fields must be filled');
      });
    });

    describe('Quando não é passado um e-mail válido no campo "email"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            email: 'yarpenzigrin@.com',
            password: '123456789'
          });
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    })

    describe('Quando não é passado uma senha válida no campo "password"', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            email: 'yarpenzigrin@anao.com',
            password: '12'
          });
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Incorrect username or password"', () => {
        expect(response.body.message).to.be.equal('Incorrect username or password');
      });
    })
  });

  describe('Casos de sucesso', () => {
    before(async () => {
      await chai.request(server)
        .post('/users')
        .send({
          name: 'Yarpen Zigrin',
          email: 'yarpenzigrin@anao.com',
          password: '123456789'
        });
    });

    after(async () => {
      db.collection('users').deleteMany({
        name: 'Yarpen Zigrin',
        email: 'yarpenzigrin@anao.com',
        password: '123456789'
      })
    })

    describe('Quando é feito o login', () => {
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send({
            email: 'yarpenzigrin@anao.com',
            password: '123456789'
          });
      });

      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('token');
      });
    });
  });
});
