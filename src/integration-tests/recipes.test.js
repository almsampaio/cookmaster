const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');

const { expect } = chai;
chai.use(chaiHttp);

const server = require('../api/app');
const { response } = require('../api/app');

describe('POST /recipes', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });
  describe('ao tentar adicionar uma receita sem estar logado', () => {
    let response = {};
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({})
        .set('authorization', '')
    });

    it('retorna um código 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna uma mensagem especifica', () => {
      expect(response.body.message).to.equal('missing auth token');
    });
  });

  describe('ao tentar adicionar uma receita sem os dados', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'sergio',
        email: 'sergio@email.com',
        password: '123456',
        role: 'user'
      })
      // loga o usuario
      const {body: { token }} = await chai.request(server)
        .post('/login')
        .send({email: 'sergio@email.com', password: '123456'});

      // tenta adicionar receita
      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'feijuca',
          ingredient: '',
          preparation: 'cozinha e come'
        })
    })
    it('retorna um código 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna uma mensagem especifica', () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });

  describe('adiciona uma receita corretamente', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'joaozinho',
        email: 'joaozinho@email.com',
        password: '123456',
        role: 'user'
      })

      // loga o usuario
      const {body: { token }} = await chai.request(server)
        .post('/login')
        .send({email: 'joaozinho@email.com', password: '123456'});

      // tenta adicionar receita
      response = await chai.request(server)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'macarronada',
          ingredients: 'macarrao',
          preparation: 'cozinha e come'
        })
    })
    it('retorna um status 201', () => {
      expect(response).to.have.status(201)
    });
    it('retorna a receita criada', () => {
      expect(response.body).to.have.property('recipe');
    });
  });
});

describe('GET /recipes', () => {
  let connectionMock
  let response
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    response = await chai.request(server).get('/recipes')
  });

  after(() => {
    MongoClient.connect.restore()
  });

  it('ao buscar todas as receitas', () => {
    expect(response.body).to.be.an('array')
  })
});

describe('GET /recipes/:id', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });
  describe('ao tentar pegar uma receita que não existe', () => {
    let response
    before(async () => {
      response = await chai.request(server)
        .get('/recipes/123')
    })
    it('retorna um status 404', () => {
      expect(response).to.have.status(404);
    });
    it('retorna uma mesnagem especifica', () => {
      expect(response.body.message).to.equal('recipe not found')
    });
  });
  describe('ao tentar pegar uma receita que existe', () => {
    let response
    before(async () => {
      //adiciona uma receita
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId } = await recipesCollection.insertOne({
        name: 'torta de frango',
        ingredients: 'massa e frango',
        preparation: 'compra no mercado e esquenta'
      })

      response = await chai.request(server)
        .get(`/recipes/${insertedId}`)
    });

    it('retorna um status 200', () => {
      expect(response).to.have.status(200);
    });
    it('retorna um objeto com a receita', () => {
      expect(response.body).to.have.property('ingredients')
    });
  });
});

describe('PUT /recipes/:id', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });
  describe('ao tentar atualizar uma receita', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'feres',
        email: 'feres@email.com',
        password: '123456',
        role: 'user'
      })

      // loga o usuario
      const {body: { token }} = await chai.request(server)
        .post('/login')
        .send({email: 'feres@email.com', password: '123456'});

      //adiciona uma receita
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId } = await recipesCollection.insertOne({
        name: 'salada',
        ingredients: 'folhas',
        preparation: 'mistura tudo'
      })

      // tenta atualizar a receita
      response = await chai.request(server)
        .put(`/recipes/${insertedId}`)
        .set('authorization', token)
        .send({
          name: 'salada',
          ingredients: 'folhas',
          preparation: 'mistura tudo muito bem'
        })
    });
    it('retorna um status 200', () => {
      expect(response).to.have.status(200)
    });
    it('retorna a receita editada', () => {
      expect(response.body).to.have.property('ingredients')
    });
  });
});

describe('DELETE /recipes/:id', () => {
  let connectionMock

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  });
  describe('ao tentar deletar uma receita', () => {
    let response
    before(async () => {
      // criar um novo user
      const userCollection = connectionMock.db('Cookmaster').collection('users')
      await userCollection.insertOne({
        name: 'fefe',
        email: 'fefe@email.com',
        password: '123456',
        role: 'user'
      })

      // loga o usuario
      const {body: { token }} = await chai.request(server)
        .post('/login')
        .send({email: 'fefe@email.com', password: '123456'});

      //adiciona uma receita
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes')
      const { insertedId } = await recipesCollection.insertOne({
        name: 'salada',
        ingredients: 'folhas',
        preparation: 'mistura tudo'
      })

      // tenta atualizar a receita
      response = await chai.request(server)
        .delete(`/recipes/${insertedId}`)
        .set('authorization', token)
    });
    it('retorna um status 204', () => {
      expect(response).to.have.status(204)
    });
  });
});