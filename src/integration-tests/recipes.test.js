const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connection');
const fs = require('fs');
chai.use(chaiHttp);
const { expect } = chai;

describe('POST /recipes', () => {
  describe('create recipe success', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
          "name": "Marcus Cesar",
          "email": "email@gmail.com",
          "password": "123456"
        });

      token = await chai.request(server)
        .post('/login')
        .send({
          "_id": "123456",
          "email": "email@gmail.com",
          "password": "123456"
        }).then((res) => res.body.token);;

      response = await chai.request(server)
        .post('/recipes')
        .send({
          "name": "Vegan Burger",
          "ingredients": "ingredients",
          "preparation": "preparation"
        }).set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('return status 201', () => {
      expect(response).to.have.status(201);
    });

    it('return an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property recipe', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('return a property name', () => {
      expect(response.body.recipe).to.have.property('name');
    });


    it('return a property ingredients', () => {
      expect(response.body.recipe).to.have.property('ingredients');
    });


    it('return a property preparation', () => {
      expect(response.body.recipe).to.have.property('preparation');
    });


    it('return a property name', () => {
      expect(response.body.recipe).to.have.property('name');
    });


    it('return a property userId', () => {
      expect(response.body.recipe).to.have.property('userId');
    });

    it('return a property _id', () => {
      expect(response.body.recipe).to.have.property('_id');
    });
  });

  describe('create recipe fail', () => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne({
          "name": "Marcus Cesar",
          "email": "email@gmail.com",
          "password": "123456"
        });

      token = await chai.request(server)
        .post('/login')
        .send({
          "_id": "123456",
          "email": "email@gmail.com",
          "password": "123456"
        }).then((res) => res.body.token);;
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('name is required', async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          "name": "",
          "ingredients": "ingredients",
          "preparation": "preparation"
        }).set('authorization', token);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('ingredients is required', async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          "name": "Vegan Burger",
          "ingredients": "",
          "preparation": "preparation"
        }).set('authorization', token);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('preparation is required', async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          "name": "Vegan Burger",
          "ingredients": "ingredients",
          "preparation": ""
        }).set('authorization', token);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('token is invalid', async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send({
          "name": "Vegan Burger",
          "ingredients": "ingredients",
          "preparation": "preparation"
        }).set('authorization', "21231");

      expect(response).to.have.status(401);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('jwt malformed');
    });
  });
});

describe('GET /recipes', () => {
  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

    connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        "name": "Marcus Cesar",
        "email": "email@gmail.com",
        "password": "123456"
      });

    connectionMock.db('Cookmaster')
      .collection('recipes')
      .insertOne({
        "name": "Vegan Mushroom Burger",
        "ingredients": "ingredients",
        "preparation": "preparation"
      });

    token = await chai.request(server)
      .post('/login')
      .send({
        "_id": "123456",
        "email": "email@gmail.com",
        "password": "123456"
      }).then((res) => res.body.token);;
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('return all recipes without authentication', async () => {
    response = await chai.request(server)
      .get('/recipes');
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0].name).to.be.equal('Vegan Burger');
    expect(response.body[1].name).to.be.equal('Vegan Mushroom Burger');
  });

  it('return all recipes with authentication', async () => {
    response = await chai.request(server)
      .get('/recipes').set('authorization', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0].name).to.be.equal('Vegan Burger');
    expect(response.body[1].name).to.be.equal('Vegan Mushroom Burger');
  });
});

describe('GET /recipes/:id', () => {
  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

    connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        "name": "Marcus Cesar",
        "email": "email@gmail.com",
        "password": "123456"
      });

    recipeId = await chai.request(server)
      .get('/recipes').then((response) => response.body[0]._id);

    token = await chai.request(server)
      .post('/login')
      .send({
        "_id": "123456",
        "email": "email@gmail.com",
        "password": "123456"
      }).then((res) => res.body.token);;
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('return recipe without authentication', async () => {
    response = await chai.request(server)
      .get(`/recipes/${recipeId}`);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body.name).to.be.equal('Vegan Burger');
  });

  it('return recipe with authentication', async () => {
    response = await chai.request(server)
      .get(`/recipes/${recipeId}`).set('authorization', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body.name).to.be.equal('Vegan Burger');
  });

  it('invalid id', async () => {
    response = await chai.request(server)
      .get(`/recipes/${123}`);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('recipe not found');
  });
});

describe('PUT /recipes/:id', () => {
  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

    connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        "name": "Marcus Cesar",
        "email": "email@gmail.com",
        "password": "123456",
        "role": "admin"
      });

    recipeId = await chai.request(server)
      .get('/recipes').then((response) => response.body[0]._id);

    token = await chai.request(server)
      .post('/login')
      .send({
        "_id": "123456",
        "email": "email@gmail.com",
        "password": "123456"
      }).then((res) => res.body.token);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('missing auth token', async () => {
    response = await chai.request(server)
      .put(`/recipes/${recipeId}`).send({
        "name": "Vegan Mushroom Burger",
        "ingredients": "ingredients",
        "preparation": "preparation"
      });
    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('missing auth token');
  });

  it('invalid auth token', async () => {
    response = await chai.request(server)
      .put(`/recipes/${recipeId}`)
      .send({
        "name": "Vegan Mushroom Burger",
        "ingredients": "ingredients",
        "preparation": "preparation"
      })
      .set('authorization', '123');
    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('jwt malformed');
  });

  it('if user is admin', async () => {
    response = await chai.request(server)
      .put(`/recipes/${recipeId}`).send({
        "name": "updated",
        "ingredients": "updated",
        "preparation": "updated"
      }).set('authorization', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('name');
    expect(response.body.name).to.be.equal('updated');
    expect(response.body).to.have.property('ingredients');
    expect(response.body.name).to.be.equal('updated');
    expect(response.body).to.have.property('preparation');
    expect(response.body.name).to.be.equal('updated');
  });

  it('is valid token', async () => {
    response = await chai.request(server)
      .put(`/recipes/${recipeId}`)
      .send({
        "name": "updated",
        "ingredients": "updated",
        "preparation": "updated"
      })
      .set('authorization', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('name');
    expect(response.body.name).to.be.equal('updated');
    expect(response.body).to.have.property('ingredients');
    expect(response.body.name).to.be.equal('updated');
    expect(response.body).to.have.property('preparation');
    expect(response.body.name).to.be.equal('updated');
  });
});

describe('DELETE /recipes/:id', () => {
  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

    connectionMock.db('Cookmaster')
      .collection('users')
      .insertOne({
        "name": "Marcus Cesar",
        "email": "email@gmail.com",
        "password": "123456",
        "role": "admin"
      });

    recipeId = await chai.request(server)
      .get('/recipes').then((response) => response.body[0]._id);

    token = await chai.request(server)
      .post('/login')
      .send({
        "_id": "123456",
        "email": "email@gmail.com",
        "password": "123456"
      }).then((res) => res.body.token);;
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  it('missing auth token', async () => {
    response = await chai.request(server)
      .delete(`/recipes/${recipeId}`);

    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('missing auth token');
  });

  it('is deleted', async () => {
    response = await chai.request(server)
      .delete(`/recipes/${recipeId}`)
      .set('authorization', token);
    expect(response).to.have.status(204);
  });
});
