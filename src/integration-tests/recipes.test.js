const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
chai.use(chaiHttp);

const { expect } = chai;

const { getConnection } = require('./connectionMock');
const server = require('../api/app');

const secret = 'senhaSecretaDoProjeto';

describe('POST /recipes', () => {
  let connectionMock;
  const name = 'name';
  const ingredients = 'ingredients';
  const preparation = 'preparation';
  const email = 'email@email.com'
  const password = 'password'

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    const userCollection = connectionMock.db('Cookmaster').collection('users');
    userCollection.deleteMany({});
    MongoClient.connect.restore()
  })

  describe('When user is not logged', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/recipes').send({ name, ingredients, preparation })
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('missing auth token')
    });
  })

  describe('When user has a invalid jwt', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/recipes')
        .set('authorization', 'wrongJWT').send({ name, ingredients, preparation });
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('jwt malformed')
    });

  });

  describe('When user has a valid JWT but dont inform recipe name', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });
      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;
      response = await chai.request(server).post('/recipes')
        .set('authorization', token).send({ ingredients, preparation });
    });

    it('Returns status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When user has a valid JWT but dont inform ingredients', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });
      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;

      response = await chai.request(server).post('/recipes')
        .set('authorization', token).send({ name, preparation });
    });

    it('Returns status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When user has a valid JWT but dont inform recipe preparation', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });

      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;

      response = await chai.request(server).post('/recipes')
        .set('authorization', token).send({ name, ingredients });

      
    });

    it('Returns status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When recipe is created', async () => {
    let response;
    let userId

    before(async () => {
    const userCollection = connectionMock.db('Cookmaster').collection('users');
    userCollection.insertOne({ email, password });
    const authResponse = await chai.request(server).post('/login').send({ name, email, password });
    const token = authResponse.body.token;
    response = await chai.request(server).post('/recipes')
      .set('authorization', token).send({ name, ingredients, preparation });
    const payload = jwt.verify(token, secret);
    userId = payload.data._id;
    });

    after(async () => {
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes');
      recipeCollection.deleteMany({});
    })
    
    it('Returns status 201', () => {
      expect(response).to.have.status(201);
    });
    
    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });
    
    it('Response Object has a "recipe" property', async () => {
      expect(response.body).to.have.property('recipe')
    });
    
    it('"recipe" property has the correct recipe name', () => {
      expect(response.body.recipe.name).to.equal(name);
    });
    
    it('"recipe" property has the correct recipe ingredients', () => {
      expect(response.body.recipe.ingredients).to.equal(ingredients);
    });
    
    it('"recipe" property has the correct recipe preparation', () => {
      expect(response.body.recipe.preparation).to.equal(preparation);
    });
    
    it('"recipe" property has the property userId with correct value', async () => {
      expect(response.body.recipe.userId).to.be.equal(userId);
    });

  })
});

describe('GET /recipes', () => {
  let connectionMock;
  const name = 'name';
  const ingredients = 'ingredients';
  const preparation = 'preparation';
  const name2 = 'name2';
  const ingredients2 = 'ingredients2';
  const preparation2 = 'preparation2';

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore()
  })
  describe('Shows all recipes', () => {
    before(async () => {
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes');
      recipeCollection.insertMany([
        { name, ingredients, preparation },
        { name: name2, ingredients: ingredients2, preparation: preparation2 },
      ]);

      response = await chai.request(server).get('/recipes');
    });

    it('Returns status 200', async () => {
      expect(response).to.have.status(200);
    });

    it('Returns an array on body', async () => {
      expect(response.body).to.be.an('array');
    });

    it('Returns the first recipe correctly', () => {
      expect(response.body[0].name).to.equal(name)
    });

    it('Returns the second recipe correctly', () => {
      expect(response.body[1].name).to.equal(name2)
    })
  });

});

describe('GET /recipes/:_id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    const recipeCollection = connectionMock.db('Cookmaster').collection('recipes');
    recipeCollection.deleteMany({});
    MongoClient.connect.restore()
  });

  describe('When the recipe dosent exist', () => {
    let response;
    const wrongId = 'wrongId'
    before(async () => {
      response = await chai.request(server).get(`/recipes/${wrongId}`)
    });

    it('Returns status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('recipe not found')
    });
  })

  describe('When the recipe exists', () => {
    let _id;
    let response;
    const name = 'name';
    const ingredients = 'ingredients';
    const preparation = 'preparation';

    before(async () => {
      const recipeCollection = connectionMock.db('Cookmaster').collection('recipes');
      recipeCollection.insertOne({ name, ingredients, preparation });
      const recipe = await recipeCollection.findOne({name})
      _id = recipe._id;
      response = await chai.request(server).get(`/recipes/${_id}`)
    });

    it('Returns status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a name property', async () => {
      expect(response.body).to.have.property('name')
    });

    it('"name" property has the right value', async () => {
      expect(response.body.name).to.equal(name)
    });

    it('Response Object has a ingredients property', async () => {
      expect(response.body).to.have.property('ingredients')
    });

    it('"ingredients" property has the right value', async () => {
      expect(response.body.ingredients).to.equal(ingredients)
    });

    it('Response Object has a preparation property', async () => {
      expect(response.body).to.have.property('preparation')
    });

    it('"preparation" property has the right value', async () => {
      expect(response.body.preparation).to.equal(preparation)
    });
  });

});

describe('PUT /recipes/:_id', () => {
  let connectionMock;

  let _id;
  //first user
  const userName = 'name';
  const password = 'password';
  const email = 'email@email.com';
  const role = 'user';

  // second user
  const userName2 = 'name2';
  const password2 = 'password2';
  const email2 = 'email2@email.com';
  
  // admin user
  const adminName = 'adminName';
  const adminPassword = 'adminPassword';
  const adminEmail = 'admin@email.com';
  const adminRole = 'admin';
  // recipe
  const name = 'name';
  const ingredients = 'ingredients';
  const preparation = 'preparation';
  const nameUpdated = 'nameUpdated';

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const userCollection = await connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ name: adminName, email: adminEmail, password: adminPassword, role: adminRole });
    await chai.request(server).post('/users').send({ name: userName, email, password })
  
    const login = await chai.request(server).post('/login').send({ email, password });
    const token = login.body.token;

    const recipe = await chai.request(server).post('/recipes')
      .set('authorization', token).send({ name, ingredients, preparation});

    _id = recipe.body.recipe._id;
  });

  after(async () => {
    const userCollection = await connectionMock.db('Cookmaster').collection('users');
    userCollection.deleteMany({});
    const recipeCollection = await connectionMock.db('Cookmaster').collection('recipes');
    recipeCollection.deleteMany({});
    MongoClient.connect.restore()
  });

  describe('When the recipe dosent exist', () => {
    let response;
    const wrongId = 'wrongId'
    before(async () => {
      response = await chai.request(server).get(`/recipes/${wrongId}`)
    });

    it('Returns status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('recipe not found')
    });
  })

  describe('When user is not logged', () => {
    let response;
    before(async () => {
      response = await chai.request(server).put(`/recipes/${_id}`).send({ name, ingredients, preparation })
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('missing auth token')
    });
  })

  describe('When user has a invalid jwt', () => {
    let response;
    before(async () => {
      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', 'wrongJWT').send({ name, ingredients, preparation });
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('jwt malformed')
    });

  });

  describe('When user didnt create the recipe', () => {
    let response;
    before(async () => {
      await chai.request(server).post('/users').send({ name: userName2, email: email2, password: password2 })
      const login = await chai.request(server).post('/login').send({email: email2, password: password2});
      const token = login.body.token;
      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', token).send({ name, ingredients, preparation });
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('missing auth token')
    });

  });

  describe('When user has a valid JWT but dont inform recipe name', () => {
    let response;
    
    before(async () => {
      
      const login = await chai.request(server).post('/login').send({ email, password });
      const token = login.body.token;

      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', token).send({ ingredients, preparation });
    });

    it('Returns status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When user has a valid JWT but dont inform ingredients', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });
      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;

      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', token).send({ name, preparation });
    });

    it('Returns status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When user has a valid JWT but dont inform recipe preparation', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });

      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;

      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', token).send({ name, ingredients });

      
    });

    it('Returns status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('Invalid entries. Try again.')
    });

  });

  describe('When the recipe is updated by the user who create it', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });

      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;

      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', token).send({ name: nameUpdated, ingredients, preparation });

      
    });

    it('Returns status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "name" property', async () => {
      expect(response.body).to.have.property('name')
    });

    it('"name" property has the right value', async () => {
      expect(response.body.name).to.equal(nameUpdated)
    });

  });

  describe('When the recipe is updated by a admin user ', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });

      const authResponse = await chai.request(server).post('/login').send({ email: adminEmail, password: adminPassword });

      const token = authResponse.body.token;

      response = await chai.request(server).put(`/recipes/${_id}`)
        .set('authorization', token).send({ name: nameUpdated, ingredients, preparation });

      
    });

    it('Returns status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "name" property', async () => {
      expect(response.body).to.have.property('name')
    });

    it('"name" property has the right value', async () => {
      expect(response.body.name).to.equal(nameUpdated)
    });

  });
})

describe('DELETE /recipes/:_id', () => {
  let connectionMock;

  let _id;
  //first user
  const userName = 'name';
  const password = 'password';
  const email = 'email@email.com';
  const role = 'user';

  // second user
  const userName2 = 'name2';
  const password2 = 'password2';
  const email2 = 'email2@email.com';
  
  // admin user
  const adminName = 'adminName';
  const adminPassword = 'adminPassword';
  const adminEmail = 'admin@email.com';
  const adminRole = 'admin';
  // recipe
  const name = 'name';
  const ingredients = 'ingredients';
  const preparation = 'preparation';

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    const userCollection = await connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ name: adminName, email: adminEmail, password: adminPassword, role: adminRole });
    await chai.request(server).post('/users').send({ name: userName, email, password })
  
    const login = await chai.request(server).post('/login').send({ email, password });
    const token = login.body.token;

    const recipe = await chai.request(server).post('/recipes')
      .set('authorization', token).send({ name, ingredients, preparation});

    _id = recipe.body.recipe._id;
  });

  after(async () => {
    const userCollection = await connectionMock.db('Cookmaster').collection('users');
    userCollection.deleteMany({});
    const recipeCollection = await connectionMock.db('Cookmaster').collection('recipes');
    recipeCollection.deleteMany({});
    MongoClient.connect.restore()
  });

  describe('When the recipe dosent exist', () => {
    let response;
    const wrongId = 'wrongId'
    before(async () => {
      response = await chai.request(server).get(`/recipes/${wrongId}`)
    });

    it('Returns status 404', () => {
      expect(response).to.have.status(404);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('recipe not found')
    });
  })

  describe('When user is not logged', () => {
    let response;
    before(async () => {
      response = await chai.request(server).delete(`/recipes/${_id}`)
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('missing auth token')
    });
  })

  describe('When user has a invalid jwt', () => {
    let response;
    before(async () => {
      response = await chai.request(server).delete(`/recipes/${_id}`)
        .set('authorization', 'wrongJWT');
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('jwt malformed')
    });

  });

  describe('When user didnt create the recipe', () => {
    let response;
    before(async () => {
      await chai.request(server).post('/users').send({ name: userName2, email: email2, password: password2 })
      const login = await chai.request(server).post('/login').send({email: email2, password: password2});
      const token = login.body.token;
      response = await chai.request(server).delete(`/recipes/${_id}`)
        .set('authorization', token);
    });

    it('Returns status 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Returns an object on body', async () => {
      expect(response).to.have.an('object');
    });

    it('Response Object has a "message" property', async () => {
      expect(response.body).to.have.property('message')
    });

    it('"Message" property has the right value', async () => {
      expect(response.body.message).to.equal('missing auth token')
    });

  });

  describe('When the recipe is deleted by the user who create it', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });

      const authResponse = await chai.request(server).post('/login').send({ name, email, password });

      const token = authResponse.body.token;

      response = await chai.request(server).delete(`/recipes/${_id}`)
        .set('authorization', token);

      
    });

    it('Returns status 204', () => {
      expect(response).to.have.status(204);
    });

    it('Returns an empty body', async () => {
      expect(response.body).to.be.empty;
    });

    it('Recipe is not found at the data base', async () => {
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
      const deletedRecipe = recipesCollection.findOne({ _id });
      expect(deletedRecipe).to.be.empty;
    });

  });

  describe('When the recipe is updated by a admin user ', () => {
    let response;
    
    before(async () => {
      const userCollection = connectionMock.db('Cookmaster').collection('users');
      userCollection.insertOne({ email, password });

      const login = await chai.request(server).post('/login').send({ email, password });
      const userToken = login.body.token;
  
      const recipe = await chai.request(server).post('/recipes')
        .set('authorization', userToken).send({ name, ingredients, preparation});
  
        _id = recipe.body.recipe._id;

      const authResponse = await chai.request(server).post('/login').send({ email: adminEmail, password: adminPassword });

      const token = authResponse.body.token;

      response = await chai.request(server).delete(`/recipes/${_id}`)
        .set('authorization', token);

      
    });

    it('Returns status 204', () => {
      expect(response).to.have.status(204);
    });

    it('Returns an empty body', async () => {
      expect(response.body).to.be.empty;
    });

    it('Recipe is not found at the data base', async () => {
      const recipesCollection = connectionMock.db('Cookmaster').collection('recipes');
      const deletedRecipe = recipesCollection.findOne({ _id });
      expect(deletedRecipe).to.be.empty;
    });


  });
})
