const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { after, before, describe } = require('mocha')
chai.use(chaiHttp);
const app = require('../api/app');
const should = chai.should();
const sinon = require('sinon');
const expect = chai.expect;
const { MongoMemoryServer } = require('mongodb-memory-server') ;

let mongoMemory
let connectionMock

before(async () => {
  mongoMemory = new MongoMemoryServer();
  const URLMock = await mongoMemory.getUri();
  connectionMock = await MongoClient.connect(URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true });
  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
})

after(async () => {
  MongoClient.connect.restore();
  await mongoMemory.stop();
});

describe('Users', () => {
  it('POST /users', done => {
    chai
      .request(app)
      .post('/users')
      .send({
        name: 'user',
        email: 'user10@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).to.have.property('user')
        done();
      });
  });
  it('POST /users validation error', done => {
    chai
      .request(app)
      .post('/users')
      .send({
        email: 'user10@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).to.equal('Invalid entries. Try again.')
        done();
      });
  })
  it('POST /users duplicate user error', done => {
    const req = {
      name: 'user',
      email: 'user10@gmail.com',
      password: 'password',
    }

    chai.request(app).post('/users').send(req)
    chai
      .request(app)
      .post('/users')
      .send(req)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res.body.message).to.equal('Email already registered')
        done();
      });
  })
});

describe('Auth', () => {
  it('POST /login', done => {
    chai.request(app).post('/users').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'password',
    }).end((err, res) => {
      chai.request(app).post('/login').send({
        email: 'user@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.have.property('token')
        done();
      });
    })
  });
  it('POST /login invalid credentials error', done => {
    chai.request(app).post('/users').send({
      name: 'user',
      email: 'user@gmail.com',
      password: 'password',
    }).end((err, res) => {
      chai.request(app).post('/login').send({
        email: 'user2@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.equal('Incorrect username or password')
        done();
      });
    })
  });
});