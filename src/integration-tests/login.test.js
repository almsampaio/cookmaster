const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { getconnectionMock } = require('./getConnection');

const server = require('../api/app');

const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('quando nao tem email', () => {
    let response;

    before(async () => {

    response = await chai.request(server)
      .post('/login')
      .send({
        password: 'senha123'
      });
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

    it('deve retornar a mensagem com "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });
  
  describe('quando nao tem password', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'teste@teste.com',
        });
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

    it('deve retornar a mensagem com "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('quando email ou senha esta incorreto', () => {
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
          });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'teste@teste.com',
          password: 'senha12'
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await connectionMock.db('Cookmaster')
      .collection('users')
      .deleteMany({});
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

    it('deve retornar a mensagem com "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

//   describe('quando consegue fazer login', () => {
//     let response;
//     let connectionMock;

//     before(async () => {
//       connectionMock = await getconnectionMock();
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    
//     await connectionMock.db('Cookmaster')
//       .collection('users')
//       .insertOne({
//           name: 'Teste',
//           email: 'teste@teste.com',
//           password: 'senha123',
//           role: 'user'
//         })

//     response = await chai.request(server)
//       .post('/login')
//       .send({
//         email: 'teste@teste.com',
//         password: 'senha123'
//       });
//     });

//     after(async () => {
//       await connectionMock.db('Cookmaster')
//       .collection('users')
//       .deleteMany({});
//       MongoClient.connect.restore();
//     });

//     it('retorna o codigo de status 200', () => {
//       expect(response).to.have.status(200);
//     });

//     it('retorna um objeto', () => {
//       expect(response.body).to.be.a('object');
//     });

//     it('o objeto possui a propriedade "message"', () => {
//       expect(response.body).to.have.property('token');
//     });
//   });
});
