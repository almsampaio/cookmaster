const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHttp); // essa lib faz o app.listen da aplicação sozinha (não precisa fazer o npm run dev);
const { expect } = chai;

const server = require('../api/app'); // pega o app exportado do app.js;

const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  })

  describe('email is required', () => {
    let response;
    before(async () => { // ponto de partida é simular a requisição; não é um teste apenas do controller, ou do services ou do model; é um teste da requisição completa;
      response = await chai.request(server) // faz uma requisição .post pro server que o app.js monta (só épossível com o chaiHttp), e manda no body a chave password com valor 12345678;
      .post('/login')
      .send({password: '12345678'});
    });

    after(async () => {});

    it('verify Unauthorized http status', () => {
      expect(response).to.have.status(401);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('password is required', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@gmail.com'});
    });

    after(async () => {});

    it('verify Unauthorized http status', () => {
      expect(response).to.have.status(401);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('All fields must be filled');
    });
  });

  describe('verify if email is valid', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@', password: '12345678'});
    });

    after(async () => {});

    it('verify Unauthorized http status', () => {
      expect(response).to.have.status(401);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('verify if password is valid', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@gmail.com', password: '12'});
    });

    after(async () => {});

    it('verify Unauthorized http status', () => {
      expect(response).to.have.status(401);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Incorrect username or password');
    });
  });

  describe('verify if user can login', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users')

      await usersCollection.insertOne({
        name: 'Erick Jacquin',
        email: 'erickjacquin@gmail.com',
        password: '12345678',
        role: 'user',
      })
      response = await chai.request(server)
      .post('/login')
      .send({email: 'erickjacquin@gmail.com', password: '12345678'});
    });

    it('verify Ok http status', () => {
      expect(response).to.have.status(200);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a token', () => {
      expect(response.body).to.have.property('token');
    });

    it('verify if that is a message', () => {
      expect(response.body.token).to.be.not.empty;
    });
  });
});

describe('POST /users', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  })

  describe('name is required', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
    });

    after(async () => {});

    it('verify Ok http status', () => {
      expect(response).to.have.status(409);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Email already registered');
    });
  });

  describe('email is required', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        password: '12345678'
      });
    });

    after(async () => {});

    it('verify Bad Request http status', () => {
      expect(response).to.have.status(400);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('verify invalid email', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'brunobatista@',
        password: '12345678'
      });
    });

    after(async () => {});

    it('verify Bad Request http status', () => {
      expect(response).to.have.status(400);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('password is required', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'Batista',
        email: 'brunobatista@gmail.com',
        role: 'user',
      });
    });

    after(async () => {});

    it('verify create http status', () => {
      expect(response).to.have.status(201);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });
  });
});

describe('POST /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  })

  describe('name is required', () => {
    let response;
    before(async () => { // ponto de partida é simular a requisição; não é um teste apenas do controller, ou do services ou do model; é um teste da requisição completa;
      response = await chai.request(server) // faz uma requisição .post pro server que o app.js monta (só épossível com o chaiHttp), e manda no body a chave password com valor 12345678;
      .post('/recipes')
      .send({ingredients: 'ingredient1', preparation: 'preparation text', userId: '61673d9066dfc607cf9361cb' });
    });

    after(async () => {});

    it('verify Bad Request http status', () => {
      expect(response).to.have.status(400);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('ingredient is required', () => {
    let response;
    before(async () => { // ponto de partida é simular a requisição; não é um teste apenas do controller, ou do services ou do model; é um teste da requisição completa;
      response = await chai.request(server) // faz uma requisição .post pro server que o app.js monta (só épossível com o chaiHttp), e manda no body a chave password com valor 12345678;
      .post('/recipes')
      .send({name: 'recipe 1', preparation: 'preparation text', userId: '61673d9066dfc607cf9361cb' });
    });

    after(async () => {});

    it('verify Bad Request http status', () => {
      expect(response).to.have.status(400);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('preparation is required', () => {
    let response;
    before(async () => { // ponto de partida é simular a requisição; não é um teste apenas do controller, ou do services ou do model; é um teste da requisição completa;
      response = await chai.request(server) // faz uma requisição .post pro server que o app.js monta (só épossível com o chaiHttp), e manda no body a chave password com valor 12345678;
      .post('/recipes')
      .send({name: 'recipe 1', ingredients: 'ingredient 1', userId: '61673d9066dfc607cf9361cb' });
    });

    after(async () => {});

    it('verify Bad Request http status', () => {
      expect(response).to.have.status(400);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });
});

describe('POST /users/admin', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  })

  describe('name is required', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/users/admin')
      .send({
        email: 'root@email.com', // não passei o name para dar erro
        password: 'admin',
      });
    });

    after(async () => {});

    it('verify Forbidden http status', () => {
      expect(response).to.have.status(403);
    });

    it('verify if that is a object on the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('verify if that is a message on the object', () => {
      expect(response.body).to.have.property('message');
    });

    it('verify message text', () => {
      expect(response.body.message).to.be.equals('Only admins can register new admins');
    });
  });

  describe('verify if it is possible to create a admin', () => {
    let response;

    before(async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ODQwZmU4MmU0NDU3YTJlMjJjZmQiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6InJvb3RAZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM0MTc2Mzc1fQ.pVxhHMb96z1chK30xuKKbKri86WDP9gIN3fSk3TU-Vk';
      // const token = '';
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token) // https://stackoverflow.com/questions/36961197/add-custom-http-headers-to-chai-requests; .set para setar http headers
        .send({
          name: 'Renan',
          email: 'renanTeste@gmail.com',
          password: '123456'
        })
    });

    it('verify Created http status', () => {
      expect(response).to.have.status(201);
    });
  });

});

