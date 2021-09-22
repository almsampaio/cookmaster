const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const server = require('../api/app');
const { describe } = require('mocha');

describe('1- POST /users', () => {
  let connectionMock;

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quando um ou mais campos obrigatórios não são preenchidos', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/users')
      .send('name', '');
    });

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

  describe('Quando é inserido um email já existente', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        email: 'teste@gmail.com',
        password: '12345678'
      });

      response = await chai.request(server)
      .post('/users')
      .send({
        name: 'teste',
        email: 'teste@gmail.com',
        password: '12345678'
      });
    });

    it('retorna código de status "409"', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui a mensagem "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });

  });
});

describe('2- POST /login', () => {
  let connectionMock;

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quando um ou mais campos obrigatórios não são preenchidos', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        email: '',
        password: ''
      });
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
    
    it('a propriedade "message" possui a mensagem "All fields must be filled"', () => {
      expect(response.body.message).to.be.equal('All fields must be filled');
    });
  })

  describe('Quando o campo email não é preenchido corretamente', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@',
        password: '12345678'
      });
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
    
    it('a propriedade "message" possui a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('Quando o campo password não é preenchido corretamente', () => {
    before(async () => {
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '123'
      });
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
    
    it('a propriedade "message" possui a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });

  describe('Quando todos os campos são preenchidos corretamente', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
      
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      })
    })

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "token"', () => {
      expect(response.body).to.have.property('token');
    }); 
  });

  describe('Quando os campos são preenchidos corretamente mas o usuário/senha informada não existe.', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });
      
      response = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin8@gmail.com',
        password: '123455746'
      })
    })

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui a mensagem "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  })
});
