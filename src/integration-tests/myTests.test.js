const app = require('../api/app');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test user create', () => {
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
        .post('/users')
        .send({
          "name": "Edmilson",
          "email": "edmilson@",
          "password": "edmilsontest"
        })
    })

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('return 400 code', () => {
      expect(res).to.have.status(400);
    })

    it('return a object', () => {
      expect(res.body).to.be.an('object')
    })

    it('the object has the property "message"', () => {
      expect(res.body).to.have.property('message')
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

      res = await chai.request(app)
        .post('/users')
        .send({
          "name": "Edmilson",
          "email": "edmilson@edmilson.com",
          "password": "edmilsontest"
        })
    })

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('return 201 code', () => {
      expect(res).to.have.status(201);
    })

    it('return a object', () => {
      expect(res.body).to.be.an('object')
    })

    it('the object has the property "user"', () => {
      expect(res.body).to.have.property('user')
    })

    it('user have the correct keys', () => {
      expect(res.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    })

    it('contains the correct name value', () => {
      expect(res.body.user.name).to.be.equal('Edmilson');
    })

    it('contains the correct email value', () => {
      expect(res.body.user.email).to.be.equal('edmilson@edmilson.com')
    })

    it('contains the correct role value', () => {
      expect(res.body.user.role).to.be.equal('user')
    })
  });
});

describe('Test user login', () => {
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
        .post('/login')
        .send({ "email": "edmilson@edmilson.com" })
    })

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('return 401 code', () => {
      expect(res).to.have.status(401);
    })

    it('return a object', () => {
      expect(res.body).to.be.an('object')
    })

    it('the object has the property "message"', () => {
      expect(res.body).to.have.property('message')
    })

    it('the property "message" is correct', () => {
      expect(res.body.message).to.be.equal('All fields must be filled')
    })
  });
});
