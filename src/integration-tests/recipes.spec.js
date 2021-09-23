const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const getConnection = require('./connection');

chai.use(chaiHttp);
const { expect } = chai;

const VALID_NEW_USER = {
  name: 'userName',
  email: 'userName@email.com',
  password: '12345678',
};
const ADMIN_USER = {
  name: 'adminName',
  email: 'adminName@email.com',
  password: '12345678',
  role: 'admin',
};
const VALID_RECIPE = {
  name: 'Frango',
  ingredients: 'Frango uai',
  preparation: 'Muito versátil',
};
const VALID_RECIPE_EDITED = {
  name: 'Frango editado',
  ingredients: 'Frango uai',
  preparation: 'Muito versátil',
};
const INVALID_NEW_USER = {
  name: 'userName',
  password: '12345678',
};
const INVALID_RECIPE = {
  ingredients: 'Frango uai',
  preparation: 'Muito versátil',
};

const userSetup = async (user, recipeObj) => {
  await chai.request(server).post('/users').send(user);
  const { body: { token } } = await chai.request(server)
    .post('/login')
    .send({ email: 'userName@email.com', password: '12345678' });
  const response = await chai.request(server)
    .post('/recipes')
    .set('authorization', token)
    .send(recipeObj);
  return { response, token };
};


describe('POST /recipes', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Todos os dados são válidos', async () => {
    let response = {};

    before(async () => {
      response = await userSetup(VALID_NEW_USER, VALID_RECIPE)
        .then(res => res.response);
    });

    it('Deve ter status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Deve retornar um objeto com as informações da nova receita', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('recipe');
      expect(response.body.recipe).to.have.property('name');
      expect(response.body.recipe).to.have.property('_id');
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe.name).to.be.equal('Frango');
    });
  });

  describe('Quando a receita não é valida', async () => {
    let response = {};
    before(async () => {
      response = await userSetup(INVALID_NEW_USER, INVALID_RECIPE)
        .then(res => res.response);
    });
    it('Retorna o status 400', () => {
      expect(response).to.have.status(400);
    });
    it('Retorna a mensagem informando o erro', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('Usuário não logado', async () => {
    let response = {};
    before(async () => {
      response = await chai.request(server)
        .post('/recipes')
        .send(VALID_RECIPE);
    });

    it('Retorna o status 401', () => {
      expect(response).to.have.status(401);
    });
    it('Retorna a mensagem informando o erro', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });
});

describe('GET /recipes', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  it('Retorna um array com todas as receitas', async () => {
    const response = await chai.request(server).get('/recipes');
    expect(response).to.have.status(200);
    expect(response.body).to.be.a('array');
    expect(response.body[0]).to.be.a('object');
    expect(response.body[0]).to.have.property('_id');
  });
});

describe('GET /recipes/:id', () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Todas as informações são validas', async () => {
    let response = {};
    before(async () => {
      const { body: { recipe: { _id: id } } } = await userSetup(VALID_NEW_USER, VALID_RECIPE)
        .then(res => res.response);
      response = await chai.request(server).get(`/recipes/${id}`);
    });

    it('Tem status 200', () => {
      expect(response).to.have.status(200);
    });
    it('Retorna um objeto com as informações da receita', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('name');
      expect(response.body.name).to.be.equal('Frango');
    });
  });
  describe('Id da receita não existe', async () => {
    let response = {};
    before(async () => {
      response = await chai.request(server).get('/recipes/1234567890123456678901234');
    });

    it('Tem status 404', () => {
      expect(response).to.have.status(404);
    });
    it('Retorna a mensagem informando que nada foi encontrado', () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('recipe not found');
    });
  });
});

describe('PUT /recipes/:id', async () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Todos os dados recebidos estão corretos', async () => {
    let response = {};

    before(async () => {
      const result = await userSetup(VALID_NEW_USER, VALID_RECIPE);
      const { body: { recipe: { _id: id } } } = result.response;
      const { token } = result;

      response = await chai.request(server)
        .put(`/recipes/${id}`)
        .set('authorization', token)
        .send(VALID_RECIPE_EDITED);
    });

    it('Tem status 200', async () => {
      expect(response).to.have.status(200);
    });

    it('Retorna a nova receita', async () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('name');
      expect(response.body.name).to.be.equal('Frango editado');
    });
  });

  describe('Usuário não autorizado', async () => {
    let response = {};

    before(async () => {
      const result = await userSetup(VALID_NEW_USER, VALID_RECIPE);
      const { body: { recipe: { _id: id } } } = result.response;

      response = await chai.request(server)
        .put(`/recipes/${id}`)
        .set('authorization', '123456789abc')
        .send(VALID_RECIPE_EDITED);
    });

    it('Retorna código 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Retorna mensagem informando o ocorrido', async () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });

  // describe('Usuário é um admin', async () => {
  //   let response = {};

  //   before(async () => {
  //     await chai.request(server).post('/users').send(ADMIN_USER);
  //     const { body: { token: adminToken } } = await chai.request(server)
  //       .post('/login')
  //       .send({ email: 'adminName@email.com', password: '12345678' });

  //     const { response: { body: { _id: id } } } = await userSetup(VALID_NEW_USER, VALID_RECIPE);

  //     response = await chai.request(server)
  //       .put(`/recipes/${id}`)
  //       .set('authorization', adminToken)
  //       .send(VALID_RECIPE_EDITED);
  //   });

  //   it('Tem status 200', async () => {
  //     expect(response).to.have.status(200);
  //   });

  //   it('Retorna a nova receita', async () => {
  //     expect(response).to.be.a('object');
  //     expect(response.body).to.have.property('name');
  //     expect(response.body.name).to.be.equal('Frango editado');
  //   });
  // });
});

describe('DELETE /recipes/:id', async () => {
  before(async () => {
    const VirtualDB = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(VirtualDB);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Todos os dados recebidos estão corretos', async () => {
    let response = {};

    before(async () => {
      const result = await userSetup(VALID_NEW_USER, VALID_RECIPE);
      const { body: { recipe: { _id: id } } } = result.response;
      const { token } = result;

      response = await chai.request(server)
        .delete(`/recipes/${id}`)
        .set('authorization', token)
        .send(VALID_RECIPE_EDITED);
    });

    it('Tem status 204', async () => {
      expect(response).to.have.status(204);
    });
  });

  describe('Usuário não autorizado', async () => {
    let response = {};

    before(async () => {
      const result = await userSetup(VALID_NEW_USER, VALID_RECIPE);
      const { body: { recipe: { _id: id } } } = result.response;

      response = await chai.request(server)
        .delete(`/recipes/${id}`)
        .set('authorization', '123456789abc')
        .send(VALID_RECIPE_EDITED);
    });

    it('Retorna código 401', async () => {
      expect(response).to.have.status(401);
    });

    it('Retorna mensagem informando o ocorrido', async () => {
      expect(response).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('jwt malformed');
    });
  });
});
