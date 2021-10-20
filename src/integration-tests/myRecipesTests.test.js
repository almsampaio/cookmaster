const app = require('../api/app');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test recipe create', () => {
  describe('on fail', () => {
    let res = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      sinon.stub(MongoClient, 'connect').resolves(connectionMock)

      res = await chai.request(app)
        .post('/recipes')
        .send({
          "name": "string",
          "ingredients": "string",
          "preparation": "string"
        })
    })

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('return 400 code', () => {
      expect(res).to.have.status(401);
    })

    it('return a object', () => {
      expect(res.body).to.be.an('object')
    })

    it('the object has the property "message"', () => {
      expect(res.body).to.have.property('message')
    })

    it('the property "message" is correct', () => {
      expect(res.body.message).to.be.equal('missing auth token')
    })
  });

  describe('on success', () => {
    let res = {};
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      sinon.stub(MongoClient, 'connect').resolves(connectionMock)

      const collection = connectionMock.db('Cookmaster').collection('users')
      await collection.insertOne({
        name: 'fulaninho',
        email: 'fulano@gmail.com',
        password: '12345678',
        role: 'user'
      })

      const {body: { token }} = await chai.request(app)
        .post('/login')
        .send({email: 'fulano@gmail.com', password: '12345678'});

      res = await chai.request(app)
        .post('/recipes')
        .set('authorization', token)
        .send({
          name: 'string',
          ingredients: 'string',
          preparation: 'string'
        })
    })

    after(async () => {
      MongoClient.connect.restore();
    });

    it('return 201 code', () => {
      expect(res).to.have.status(201)
    });

    it('the object has the property "recipe"', () => {
      expect(res.body).to.have.property('recipe');
    });
  });

});
