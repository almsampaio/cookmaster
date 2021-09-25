const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { getconnectionMock } = require('./getConnection');

const server = require('../api/app');

const { MongoClient, ObjectId } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

const MongoID_01 = '60f2059cce2f47b32f3d5584';
const MongoID_02 = '60f0c404c7903eb851f2552c';

const RECIPE = {
  _id: ObjectId(MongoID_01),
  name: 'Teste',
  ingredients: 'Cerveja',
  preparation: 'Teste Teste',
  userId: ObjectId(MongoID_02),
}

describe('POST /recipes', () => {
  describe('quando nao tem o preparation', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'senha123',
        role: 'user'
      })

      loginResponse = await chai.request(server)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      })
      .then((result) => result.body.token);

      response = await chai.request(server)
      .post('/recipes')
      .send({
        name: 'TesteRecipe',
        ingredients: 'Cerveja'
      })
      .set('authorization', loginResponse );
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando não tem um token', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          name: 'TesteRecipe',
          ingredients: 'Cerveja',
          preparation: 'Teste Teste'
        })
        .set({});
    });

    it('retorna o codigo de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('quando o token é invalido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          name: 'TesteRecipe',
          ingredients: 'Cerveja',
          preparation: 'Teste Teste'
        })
        .set('authorization', '123645' );
    });

    it('retorna o codigo de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "jwt malformed"', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('quando consegue cadastra uma receita', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
          name: 'Teste',
          email: 'teste@teste.com',
          password: 'senha123',
          role: 'admin'
        })

      loginResponse = await chai.request(server)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: 'senha123'
        })
        .then((result) => result.body.token);

      response = await chai.request(server)
        .post('/recipes')
        .send({
          name: 'TesteRecipe',
          ingredients: 'Cerveja',
          preparation: 'Teste Teste'
        })
        .set('authorization', loginResponse );
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });
  });
});

describe('GET /recipes', () => {
  let response;
  let connectionMock;

  before(async () => {
    connectionMock = await getconnectionMock();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'senha123',
        role: 'admin'
      })

    loginResponse = await chai.request(server)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      })
      .then((result) => result.body.token);

    createresponse = await chai.request(server)
      .post('/recipes')
      .send({
        name: 'TesteRecipe',
        ingredients: 'Cerveja',
        preparation: 'Teste Teste'
      })
      .set('authorization', loginResponse );
    
    response = await chai.request(server)
      .get('/recipes');
  });

  after(async () => {
    await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
    await connectionMock.db('Cookmaster').collection('users').deleteMany({});
    MongoClient.connect.restore();
  });

  it('retorna o codigo de status 200', () => {
    expect(response).to.have.status(200);
  });

  it('retorna um array', () => {
    expect(response.body).to.be.an('array');
  });
});

describe('GET /recipes/:id', () => {
  describe('quando nao tem uma receita com ID', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .get(`/recipes/${MongoID_01}`);
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
      .collection('recipes')
      .deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "recipe not found"', () => {
      expect(response.body.message).to.be.equal('recipe not found');
    });
  });

  describe('quando tem uma receita com ID', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(RECIPE);

      response = await chai.request(server)
        .get(`/recipes/${MongoID_01}`)
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
        .collection('recipes')
        .deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('_id');
    });
  });
});

describe('DELETE /recipes/:id', () => {
  describe('quando não temos um token', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .delete(`/recipes/${MongoID_01}`)
        .send({
          name: 'TesteRecipe',
          ingredients: 'Cerveja',
          preparation: 'Teste Teste'
        })
        .set({});
    });

    it('retorna o codigo de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('quando o token é invalido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .delete(`/recipes/${MongoID_01}`)
        .send({
          name: 'TesteRecipe',
          ingredients: 'Cerveja',
          preparation: 'Teste Teste'
        })
        .set('authorization', '123645' );
    });

    it('retorna o codigo de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('deve retornar a mensagem com "jwt malformed"', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('quando consegue apagar uma receita', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'senha123',
        role: 'user'
      })

      loginResponse = await chai.request(server)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      })
      .then((result) => result.body.token);

      await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(RECIPE);
      
      response = await chai.request(server)
        .delete(`/recipes/${MongoID_01}`)
        .set('authorization', loginResponse);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 204', () => {
      expect(response).to.have.status(204);
    });

    it('retorna vazio', () => {
      expect(response.body).to.be.empty;
    });
  });
});

describe('PUT /recipes/:id', () => {
  describe('quando consegue modificar uma receita', () => {
    let response;
    let connectionMock;

    before(async () => {
      connectionMock = await getconnectionMock();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'senha123',
        role: 'user'
      })

      loginResponse = await chai.request(server)
      .post('/login')
      .send({
        email: 'teste@teste.com',
        password: 'senha123'
      })
      .then((result) => result.body.token);

      await connectionMock.db('Cookmaster')
        .collection('recipes')
        .insertOne(RECIPE);
      
      response = await chai.request(server)
        .put(`/recipes/${MongoID_01}`)
        .send({
          name: 'Teste Editado',
          ingredients: 'Cerveja Editado',
          preparation: 'Teste Teste Editado'
        })
        .set('authorization', loginResponse);
    });

    after(async () => {
      await connectionMock.db('Cookmaster').collection('recipes').deleteMany({});
      await connectionMock.db('Cookmaster').collection('users').deleteMany({});
      MongoClient.connect.restore();
    });

    it('retorna o codigo de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('_id');
    });
  });
});
