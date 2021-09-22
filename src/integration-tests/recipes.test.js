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
      const JWT_SECRET = 'test123';
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

describe('4- GET /recipes', () => {
  let connectionMock;

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quando o endpoint é chamado', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('recipes');
      await usersCollection.insertMany([{
        name: 'Frango2',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: 'avc5s46dfe1343ea3s',
      }, {
        name: 'Carne',
        ingredients: 'Carne, sazon',
        preparation: '15 minutos no forno',
        userId: 'avc234sd9f3ea3s',
      }]);
      
      response = await chai.request(server)
      .get('/recipes')
    })

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.an('array');
    });
    
    it('o array possui objetos contendo todas as receitas', () => {
      expect(response.body.length).to.be.equal(3);
      expect(response.body[0]).to.have.property('name');
      expect(response.body[0].name).to.be.equal('Frango');
      expect(response.body[1].name).to.be.equal('Frango2');
      expect(response.body[2].name).to.be.equal('Carne');
    });
    
  });
});

describe('5- GET /recipes/:id', () => {
  let connectionMock;

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Quando a receita existe', () => {
    before(async() => {
      const usersCollection = connectionMock.db('Cookmaster').collection('recipes');
      const {insertedId: id} = await usersCollection.insertOne({
        name: 'FrangoTest',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: '123456',
      });

      response = await chai.request(server)
      .get(`/recipes/${id}`)
    })

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('o objeto possui todos os detalhes da receita', () => {
      expect(response.body.name).to.be.equal('FrangoTest');
      expect(response.body.ingredients).to.be.equal('Frango, sazon');
      expect(response.body.preparation).to.be.equal('10 minutos no forno');
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('userId');
    });
  });

  describe('Quando a receita não existe', () => {
    before(async() => {
      response = await chai.request(server)
      .get('/recipes/naoexiste123')
    })

    it('retorna código de status "404"', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });
    
    it('a propriedade "message" possui a mensagem "recipe not found"', () => {
      expect(response.body.message).to.be.equal('recipe not found');
    });
  })
});

describe('7- PUT recipes/:id', () => {
  let connectionMock;

	before(async () => {
		connectionMock = await getConnection();
		sinon.stub(MongoClient, 'connect').resolves(connectionMock);
	});

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('Ao tentar editar a receita sem estar autenticado', () => {
    before(async() => {
      response = await chai.request(server)
      .put('/recipes/123')
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
    
    it('a propriedade "message" possui a mensagem "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('Ao tentar editar a receita com um token inválido', () => {
    before(async () => {
      response = await chai.request(server)
      .put('/recipes/:id')
      .set('authorization', 'idk');
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

  describe('Ao tentar editar uma receita com userId diferente', () => {
    let response;
    before(async () => {
      const usersCollection = connectionMock.db('Cookmaster').collection('users');
      await usersCollection.insertOne({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      });

      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
      const {insertedId: recipeId} = await recipesCollection.insertOne({
        name: 'FrangoTest',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
        userId: '123456',
      });

      userToken = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      })
      .then((res) => res.body.token);
      
      response = await chai.request(server)
      .put(`/recipes/${recipeId}`)
      .set('authorization', userToken)
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
    
    it('a propriedade "message" possui a mensagem "You dont have permission to do that"', () => {
      expect(response.body.message).to.be.equal('You dont have permission to do that');
    });

  });

  describe('Quando todos os campos são preenchidos corretamente', () => {
    let response;
    before(async () => {
      await chai.request(server)
      .post('/users')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      })

      const token = await chai.request(server)
      .post('/login')
      .send({
        email: 'erickjacquin@gmail.com',
        password: '12345678'
      })
      .then((res) => res.body.token);

      const recipe = await chai.request(server)
      .post('/recipes')
      .set('authorization', token)
      .send({
        name: 'FrangoTest',
        ingredients: 'Frango, sazon',
        preparation: '10 minutos no forno',
      })

      response = await chai.request(server)
      .put(`/recipes/${recipe.body.recipe._id}`)
      .set('authorization', token)
      .send({
        name: 'FrangoEditado',
        ingredients: 'special ingredient',
        preparation: '30 minutos no forno',
      })
    })

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('o objeto possui os novos valores', () => {
      expect(response.body.name).to.be.equal('FrangoEditado');
      expect(response.body.ingredients).to.be.equal('special ingredient');
      expect(response.body.preparation).to.be.equal('30 minutos no forno');
    });

  });
});