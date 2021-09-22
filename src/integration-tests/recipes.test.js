const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');
const { describe } = require('mocha');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test123';

describe('3- POST /recipes', () => {
  let connectionMock;

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quando o token inserido é inválido', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', 'erer');
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui a mensagem "jwt malformed"', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('Quando um ou mais campos obrigatórios não são preenchidos', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
      
      userToken = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      })
      .then((res) => res.body.token);

      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', userToken)
      .send({
        name: '',
        ingredients: '',
        preparation: '',
      })
    })

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui a mensagem "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Quando todos os campos são preenchidos corretamente', () => {
    let response;
    let userId;
    let userToken;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
      
      userToken = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      })
      .then((res) => res.body.token);
 
      response = await chai.request(server)
      .post('/recipes')
      .set('authorization', userToken)
      .send({
        name: 'Frango',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
      })

      const decoded = jwt.verify(userToken, JWT_SECRET);
      userId = decoded.data.id;
    })

    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });
    
    it('recipe possui as chaves name, ingredients, preparation, _id e userId"', () => {
      expect(response.body.recipe).to.have.property('name');
      expect(response.body.recipe).to.have.property('ingredients');
      expect(response.body.recipe).to.have.property('preparation');
      expect(response.body.recipe).to.have.property('_id');
      expect(response.body.recipe).to.have.property('userId');
    });

    it('a chave userId contém o id do usuário autenticado', () => {
      expect(response.body.recipe.userId).to.be.equal(userId);
    });
  });
});