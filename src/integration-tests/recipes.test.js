const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { connection } = require('./connectionMock');
const server = require('../api/app');
const fs = require('fs').promises;
const path = require('path');

chai.use(chaiHttp);

describe('POST /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => MongoClient.connect.restore());

  describe('Será validada que estar logado é necessário', () => {
    let response = {};
    const data = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'slice it',
    };

    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send(data);
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna mensagem de erro', () =>{
      expect(response.body.message).to.be.equal('missing auth token');
    })
  });

  describe('Verifica se o token é válido', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      preparation: 'just slice it',
    };
    const userData = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);
      
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', '123456')
        .send(recipeData);
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna mensagem de erro', () =>{
      expect(response.body.message).to.be.equal('jwt malformed');
    })
  });

  describe('Verifica que o campo ingrediantes deve estar preenchido', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      preparation: 'just slice it',
    };
    const userData = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });
        
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', body.token)
        .send(recipeData);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem de erro', () =>{
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
  });

  describe('Verifica que o campo preparation deve estar preenchido', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
    };
    const userData = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });
        
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', body.token)
        .send(recipeData);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem de erro', () =>{
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
  });

  describe('Verifica que o campo name deve estar preenchido', () => {
    let response = {};
    const recipeData = {
      ingredients: 'salmao',
      preparation: 'just slice it',
    };
    const userData = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });
        
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', body.token)
        .send(recipeData);
    });

    it('retorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna mensagem de erro', () =>{
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    })
  });

  describe('Será validado que é possível cadastrar uma receita com sucesso', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
    };
    const userData = {
      name: 'test',
      email: 'test@email.com',
      password: '12345678',
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });
        
      response = await chai.request(server)
        .post('/recipes')
        .set('Authorization', body.token)
        .send(recipeData);
    });

    it('retorna status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna mensagem de erro', () =>{
      expect(response.body).to.have.property('recipe');
      expect(response.body.recipe).to.have.property('_id');
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe).to.deep.include({ name: recipeData.name });
      expect(response.body.recipe).to.deep.include({ preparation: recipeData.preparation });
      expect(response.body.recipe).to.deep.include({ ingredients: recipeData.ingredients });
    });
  });
});

describe('GET /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => MongoClient.connect.restore());

  describe('Retorna uma lista com todas as receitas', () => {
    let response = {};
    const recipesData = [
      {
        name: 'sushi',
        ingredients: 'salmao',
        preparation: 'just slice it',
        userId: '1231231213',
      },
      {
        name: 'outra receita',
        ingredients: 'etc',
        preparation: 'do something',
        userId: '1231231213',
      },
    ];

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      await connectionMock.db('Cookmaster').collection('recipes')
        .insertMany(recipesData);

      response = await chai.request(server)
        .get('/recipes');
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna todas as receitas cadastradas', () => {
      expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('userId');
      expect(response.body[0]).to.deep.include({ name: recipesData[0].name });
      expect(response.body[0]).to.deep.include({ preparation: recipesData[0].preparation });
      expect(response.body[0]).to.deep.include({ ingredients: recipesData[0].ingredients });

      expect(response.body[1]).to.have.property('_id');
      expect(response.body[1]).to.have.property('userId');
      expect(response.body[1]).to.deep.include({ name: recipesData[1].name });
      expect(response.body[1]).to.deep.include({ preparation: recipesData[1].preparation });
      expect(response.body[1]).to.deep.include({ ingredients: recipesData[1].ingredients });
    });
  });
});

describe('GET /recipes/id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => MongoClient.connect.restore());

  describe('Buscar uma receita específica', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      response = await chai.request(server)
        .get(`/recipes/${insertedId}`);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna uma receita específica', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('userId');
      expect(response.body).to.deep.include({ name: recipeData.name });
      expect(response.body).to.deep.include({ preparation: recipeData.preparation });
      expect(response.body).to.deep.include({ ingredients: recipeData.ingredients });
    });
  });

  describe('Retorna erro quando a receita não existe', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      response = await chai.request(server)
        .get(`/recipes/receitainvalida`);
    });

    it('retorna status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna uma receita específica', () => {
      expect(response.body.message).to.be.equal('recipe not found');
    });
  });
});

describe('PUT /recipes/id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => MongoClient.connect.restore());

  describe('Não é possível editar uma receita sem estar autenticado', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const editedData = {
      name: 'sushi editado',
      ingredients: 'salmao editado',
      preparation: 'just slice it editado',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      response = await chai.request(server)
        .put(`/recipes/${insertedId}`)
        .send(editedData);
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna erro', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('Não é possível editar uma receita com um token inválido', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const editedData = {
      name: 'sushi editado',
      ingredients: 'salmao editado',
      preparation: 'just slice it editado',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      response = await chai.request(server)
        .put(`/recipes/${insertedId}`)
        .set('Authorization', '12345678910')
        .send(editedData);
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna mensagem de erro', () => {
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  describe('É possível editar uma receita estando autenticado', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const editedData = {
      name: 'editado',
      ingredients: 'editado',
      preparation: 'editado',
    };
    const userData = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
      role: 'user',
      _id: '1231313123123123',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);
      
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });

      response = await chai.request(server)
        .put(`/recipes/${insertedId}`)
        .set('Authorization', body.token)
        .send(editedData);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna uma receita específica', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.deep.include({ userId: recipeData.userId });
      expect(response.body).to.deep.include({ name: editedData.name });
      expect(response.body).to.deep.include({ preparation: editedData.preparation });
      expect(response.body).to.deep.include({ ingredients: editedData.ingredients });
    });
  });

  describe('É possível editar uma receita sendo um admin', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const editedData = {
      name: 'editado',
      ingredients: 'editado',
      preparation: 'editado',
    };
    const userData = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
      role: 'admin',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);
      
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });

      response = await chai.request(server)
        .put(`/recipes/${insertedId}`)
        .set('Authorization', body.token)
        .send(editedData);
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna uma receita específica', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.deep.include({ userId: recipeData.userId });
      expect(response.body).to.deep.include({ name: editedData.name });
      expect(response.body).to.deep.include({ preparation: editedData.preparation });
      expect(response.body).to.deep.include({ ingredients: editedData.ingredients });
    });
  });
});

describe('DELETE /recipes/id', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => MongoClient.connect.restore());

  describe('Não é possível excluir uma receita sem estar autenticado', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      response = await chai.request(server)
        .delete(`/recipes/${insertedId}`);
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna erro', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('É possível excluir uma receita estando autenticado', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const userData = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
      role: 'user',
      _id: '1231313123123123',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);
      
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });

      response = await chai.request(server)
        .delete(`/recipes/${insertedId}`)
        .set('Authorization', body.token);
    });

    it('retorna status 204', () => {
      expect(response).to.have.status(204);
    });

    it('retorna body vazio', () => {
      expect(response.body).to.be.deep.equal({});
    });
  });

  describe('É possível excluir uma receita sendo um admin', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const userData = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
      role: 'admin',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);
      
      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });

      response = await chai.request(server)
        .delete(`/recipes/${insertedId}`)
        .set('Authorization', body.token);
    });

    it('retorna status 204', () => {
      expect(response).to.have.status(204);
    });

    it('retorna body vazio', () => {
      expect(response.body).to.be.deep.equal({});
    });
  });
});

describe('PUT /recipes/id/image', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => MongoClient.connect.restore());

  describe('Não é possível fazer upload da imagem sem estar autenticado', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      response = await chai.request(server)
        .put(`/recipes/${insertedId}/image`)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', path.join(__dirname + '/..' + '/uploads/ratinho.jpg'));
    });

    it('retorna status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna erro', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('É possível fazer upload da imagem estando autenticado', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const userData = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
      _id: '1231313123123123',
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      recipeData.id = insertedId;

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });;

      response = await chai.request(server)
        .put(`/recipes/${insertedId}/image`)
        .set('Authorization', body.token)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', path.join(__dirname + '/..' + '/uploads/ratinho.jpg'));
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna os dados da receita atualizados', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.deep.include({ userId: recipeData.userId });
      expect(response.body).to.deep.include({ name: recipeData.name });
      expect(response.body).to.deep.include({ preparation: recipeData.preparation });
      expect(response.body).to.deep.include({ ingredients: recipeData.ingredients });
      expect(response.body).to.deep.include({
        image: `localhost:3000/src/uploads/${recipeData.id}.jpeg`,
      });
    });
  });

  describe('É possível fazer upload da imagem como usuário admin', () => {
    let response = {};
    const recipeData = {
      name: 'sushi',
      ingredients: 'salmao',
      preparation: 'just slice it',
      userId: '1231313123123123',
    };
    const userData = {
      name: 'teste',
      email: 'teste@email.com',
      password: '12345678',
      role: 'admin',
    };

    before(async () => {
      await connectionMock.db('Cookmaster').collection('recipes')
        .deleteMany({});
      await connectionMock.db('Cookmaster').collection('users')
        .deleteMany({});
      
      const { insertedId } = await connectionMock.db('Cookmaster').collection('recipes')
        .insertOne(recipeData);

      recipeData.id = insertedId;

      await connectionMock.db('Cookmaster').collection('users')
        .insertOne(userData);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: userData.email,
          password: userData.password,
        });;

      response = await chai.request(server)
        .put(`/recipes/${insertedId}/image`)
        .set('Authorization', body.token)
        .set('Content-Type', 'multipart/form-data')
        .attach('image', path.join(__dirname + '/..' + '/uploads/ratinho.jpg'));
    });

    it('retorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna os dados da receita atualizados', () => {
      expect(response.body).to.have.property('_id');
      expect(response.body).to.deep.include({ userId: recipeData.userId });
      expect(response.body).to.deep.include({ name: recipeData.name });
      expect(response.body).to.deep.include({ preparation: recipeData.preparation });
      expect(response.body).to.deep.include({ ingredients: recipeData.ingredients });
      expect(response.body).to.deep.include({
        image: `localhost:3000/src/uploads/${recipeData.id}.jpeg`,
      });
    });
  });
});
