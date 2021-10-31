const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
    describe('quando é criado com sucesso', () => {
        let response = {};
        const DBServer = new MongoMemoryServer();

        before(async () => {
          const URLMock = await DBServer.getUri();
          const connectionMock = await MongoClient.connect(URLMock,
              { useNewUrlParser: true, useUnifiedTopology: true }
          );

          sinon.stub(MongoClient, 'connect')
              .resolves(connectionMock);

          response = await chai.request(server)
              .post('/users')
              .send({
                  name: 'Alberto',
                  email: 'teste@teste.com',
                  password: 'senha123'
              });
        });

        after(async () => {
          MongoClient.connect.restore();
          await DBServer.stop();
        });

        it('retorna o código de status 201', () => {
            /*
                Perceba que aqui temos uma asserção
                específica para o status da `response` 😬
            */
            expect(response).to.have.status(201);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "user"', () => {
            expect(response.body).to.have.property('user');
        });

        // it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"',
        //     () => {
        //         expect(response.body.message)
        //             .to.be.equal('Novo usuário criado com sucesso');
        //     }
        // );
    });

    describe('quando não é criado com sucesso por erro no email', () => {
      let response = {};
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
            .resolves(connectionMock);

        response = await chai.request(server)
            .post('/users')
            .send({
                name: 'Alberto',
                email: 'teste.com',
                password: 'senha123'
            });
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código de status 401', () => {
          /*
              Perceba que aqui temos uma asserção
              específica para o status da `response` 😬
          */
          expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "message"', () => {
          expect(response.body).to.have.property('message');
      });

      // it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"',
      //     () => {
      //         expect(response.body.message)
      //             .to.be.equal('Novo usuário criado com sucesso');
      //     }
      // );
  });
});

describe('POST /login', () => {
  describe('quando é criado com sucesso', () => {
      let response = {};
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);

        await chai.request(server)
          .post('/users')
          .send({
              name: 'Alberto',
              email: 'teste@teste.com',
              password: 'senha123'
          });

        response = await chai.request(server)
          .post('/login')
          .send({
              email: 'teste@teste.com',
              password: 'senha123'
          });
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código de status 200', () => {
          expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
          expect(response.body).to.be.a('object');
      });

      it('o objeto possui a propriedade "token"', () => {
          expect(response.body).to.have.property('token');
      });

      
  });

  
});

describe('POST /recipes', () => {
  describe('quando é criado com sucesso', () => {
      let response = {};
      const DBServer = new MongoMemoryServer();

      before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );

        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);

        await chai.request(server)
          .post('/users')
          .send({
              name: 'Alberto',
              email: 'teste@teste.com',
              password: 'senha123'
          });

        loginResponse = await chai.request(server)
          .post('/login')
          .send({
              email: 'teste@teste.com',
              password: 'senha123'
          });

        response = await chai.request(server)
          .post('/recipes')
          .set('Authorization', loginResponse.body.token )
          .send({
            name: 'Nome da receita',
            ingredients: 'Ingredientes da receita',
            preparation: 'Preparo da receita'
          })
      });

      after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
      });

      it('retorna o código de status 201', () => {
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