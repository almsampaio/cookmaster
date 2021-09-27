const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');

describe('POST /users', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });
  describe('quando utiliza dados inválidos', () => {
    describe('com um nome inválido', () => {
      let response = {}
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: "",
            email: "joao@email.com",
            password: "123456"
          })
      });

      it('retorna o código 400', () => {
        expect(response).to.have.status(400);
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('com um email inválido', () => {
      let response = {}
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: "joao",
            email: "joao",
            password: "123456"
          })
      });

      it('retorna o código 400', () => {
        expect(response).to.have.status(400);
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });

    describe('com um password inválido', () => {
      let response = {}
      before(async () => {
        response = await chai.request(server)
          .post('/users')
          .send({
            name: "joao",
            email: "joao@email.com",
            password: ""
          })
      });

      it('retorna o código 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna uma mensagem de erro', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid entries. Try again."', () => {
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
  });

  describe('quando o usuário já existe', () => {
    let repeatedUser

    before(async () => {
      // cria um user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'joao',
        email: 'joao@email.com',
        password: '123456789'
      })

      repeatedUser = await chai.request(server)
        .post('/users')
        .send({
          name: 'joao',
          email: 'joao@email.com',
          password: '123456789'
        });
    });

    it('retorna o status 409', () => {
      expect(repeatedUser).to.have.status(409)
    });

    it('retorna mensagem especifica', () => {
      expect(repeatedUser.body.message).to.be.equal('Email already registered')
    });
  });
});

describe('POST /users/admin', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });

  describe('quando um usuário não logado tenta adicionar um admin', () => {
    let response = {};
    before(async () => {
      response = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'joao',
          email: 'joao@email.com',
          password: '123456',
        })
        .set('authorization', '')
    });

    it('retorna um código 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna uma mensagem especifica', () => {
      expect(response.body.message).to.equal('missing auth token');
    });
  });

  describe('quando um usuário logado, porém não admin, tenta adicionar outro admin', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'joao',
        email: 'joao@email.com',
        password: '123456',
        role: 'user'
      })
      // loga o usuario
      const {body: { token }} = await chai.request(server)
        .post('/login')
        .send({email: 'joao@email.com', password: '123456'});

      // tenta adicionar admin
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({name: 'duda', email: 'duda@mail.com', password: '123456'})
    })

    it('retorna um status 403', () => {
      expect(response).to.have.status(403)
    });
    it('retorna uma mensagem especifica', () => {
      expect(response.body.message).to.equal('Only admins can register new admins');
    });
  });
  describe('quando um admin logado adiciona outro admin', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'juan',
        email: 'juan@email.com',
        password: '123456',
        role: 'admin'
      })
      // loga o usuario
      const {body: { token }} = await chai.request(server)
        .post('/login')
        .send({email: 'juan@email.com', password: '123456'});

      // tenta adicionar admin
      response = await chai.request(server)
        .post('/users/admin')
        .set('authorization', token)
        .send({name: 'jonah', email: 'jonah@mail.com', password: '123456'})
    })

    it('retorna um status 201', () => {
      expect(response).to.have.status(201)
    });
    it('retorna uma mensagem especifica', () => {
      expect(response.body).to.have.property('user');
    });
  });
});