const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/server');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mockDatabaseConnection');

const { expect } = chai;
chai.use(chaiHttp);

describe('Requisito 3 - Testa endpoint para cadastro de receitas', () => {
  describe('quando é cadastrado com sucesso', () => {
    describe('a resposta' , () => {
      const user = {
        name: 'Carlos Caramelo',
        email: 'carlao@gmail.com',
        password: 'caramelo1999'
      };

      const { name: _, ...userLogInfo }  = user;

      const newRecipe = {
        name: 'Strogonoff de Frango',
        ingredients: 'Taca-le frango e bacon',
        preparation: 'Só dale',
      };

      let login;
      let response;
      let mockConnection;

      before(async () =>  {
        mockConnection = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(mockConnection);
        await mockConnection.db('Cookmaster').collection('users').insertOne(user);
        login = await chai.request(server).post('/login').send(userLogInfo);
        const { token } = login.body;
        response = await chai
          .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
      });

      after(async () => {
        await mockConnection.db('Cookmaster').collection('users').deleteMany({});
        await mockConnection.db('Cookmaster').collection('recipes').deleteMany({});
        MongoClient.connect.restore();
      });

      it('retorna o status 201', () => {
       expect(response).to.have.status(201);
      });

      it('retorna um objeto', () => {
        expect(response).to.be.an('object');       
      });

      it('contém a chave "recipe"', () => {
       expect(response.body).to.have.property('recipe')
      });

      it('"recipe é um objeto', () => {
       expect(response.body.recipe).to.be.an('object');
      });

      it('o objeto contém as chaves, "name", "ingredients", "preparation", "userId", "_id"', () => {
        expect(response.body.recipe).to.have.all
          .keys('name', 'ingredients', 'preparation', 'userId', '_id');
      });
    });
  });

  describe('há falha no cadastro', () => {
    describe('quando "name" nao é informado"', () => {
      describe('a resposta', () => {
        const user = {
          name: 'Carlos Caramelo',
          email: 'carlao@gmail.com',
          password: 'caramelo1999'
        };

        const { name: _, ...userLogInfo }  = user;

        const newRecipe = {
          ingredients: 'Taca-le frango e bacon',
          preparation: 'Só dale',
        };

        let login;
        let response;
        let mockConnection;

        before(async () =>  {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          await mockConnection.db('Cookmaster').collection('users').insertOne(user);
          login = await chai.request(server).post('/login').send(userLogInfo);
          const { token } = login.body;
          response = await chai
            .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
        });

        after(async () => {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('retorna o status 400', () => {
         expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
          expect(response).to.be.an('object');         
        });

        it('objeto contém a chave "message"', () => {
         expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "Invalid entries. Try again.', () => {
         expect(response.body.message).to.be.equal('Invalid entries. Try again.')
        });
      });
    });

    describe('quando "ingredients" nao é informado"', () => {
      describe('a resposta', () => {
        const user = {
          name: 'Carlos Caramelo',
          email: 'carlao@gmail.com',
          password: 'caramelo1999'
        };

        const { name: _, ...userLogInfo }  = user;

        const newRecipe = {
          name: 'Xesque',
          preparation: 'Dele',
        };

        let login;
        let response;
        let mockConnection;

        before(async () =>  {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          await mockConnection.db('Cookmaster').collection('users').insertOne(user);
          login = await chai.request(server).post('/login').send(userLogInfo);
          const { token } = login.body;
          response = await chai
            .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
        });

        after(async () => {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('retorna o status 400', () => {
         expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
          expect(response).to.be.an('object');         
        });

        it('objeto contém a chave "message"', () => {
         expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "Invalid entries. Try again.', () => {
         expect(response.body.message).to.be.equal('Invalid entries. Try again.')
        });
      });
    });

    describe('quando "preparation" nao é informado"', () => {
      describe('a resposta', () => {
        const user = {
          name: 'Carlos Caramelo',
          email: 'carlao@gmail.com',
          password: 'caramelo1999'
        };

        const { name: _, ...userLogInfo }  = user;

        const newRecipe = {
          name: 'Chama',
          ingredients: 'Jimmy',
        };

        let login;
        let response;
        let mockConnection;

        before(async () =>  {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          await mockConnection.db('Cookmaster').collection('users').insertOne(user);
          login = await chai.request(server).post('/login').send(userLogInfo);
          const { token } = login.body;
          response = await chai
            .request(server).post('/recipes').send(newRecipe).set({ authorization: token });
        });

        after(async () => {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });

        it('retorna o status 400', () => {
         expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
          expect(response).to.be.an('object');         
        });

        it('objeto contém a chave "message"', () => {
         expect(response.body).to.have.property('message');
        });

        it('"message" possui o valor "Invalid entries. Try again.', () => {
         expect(response.body.message).to.be.equal('Invalid entries. Try again.')
        });
      });
    });

    describe('quando o "token" não é válido', () => {
      describe('a resposta', () => {
        let response;
        let mockConnection;

        before(async () =>  {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          response = await chai
            .request(server).post('/recipes').send({}).set({ authorization: 'invalidToken' });
        });

        after(async () => {
          await mockConnection.db('Cookmaster').collection('users').deleteMany({});
          MongoClient.connect.restore();
        });
        it('retorna o status 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('objeto contém a chave "message"', () => {
          expect(response.body).to.have.property('message')
        });

        it('"message" possui o valor "jwt malformed', () => {
          expect(response.body.message).to.be.equal('jwt malformed');
        });
      });
    });

    describe('quando o "token" não é informado', () => {
      describe('a resposta', () => {
        let response;
        let mockConnection;

        before(async () =>  {
          mockConnection = await getConnection();
          sinon.stub(MongoClient, 'connect').resolves(mockConnection);
          response = await chai
            .request(server).post('/recipes').send({});
        });

        after(async () => {
          MongoClient.connect.restore();
        });
        it('retorna o status 401', () => {
          expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
          expect(response.body).to.be.an('object');
        });

        it('objeto contém a chave "message"', () => {
          expect(response.body).to.have.property('message')
        });

        it('"message" possui o valor "missing auth token"', () => {
          expect(response.body.message).to.be.equal('missing auth token');
        });
      });
    });
  })
});
