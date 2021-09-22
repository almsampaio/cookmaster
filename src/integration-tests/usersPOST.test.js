const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /users', () => {
  const postUser = async (user) => {
    return chai.request(server)
            .post('/users')
            .send(user);
  }
  describe('Quando não se espera o cadastro:', () => {
    describe('Ao omitir ou passar um "name" inválido', () => {
      let badUser = {
        email: 'erickjacquin@mail.com',
        password: '1234567890',
      };
      let response;
      before(async () => {
        response = await postUser(badUser);
      });
      it('Deve retornar o status 400, BadRequest', () => {
        expect(response).to.have.status(400);
      });
      it('Deve retornar um objeto { message: "Invalid entries. Try again." }', () => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    })
    describe('Ao omitir o "email", ou passar um email inválido', () => {
      it('Deve retornar o status 400, BadRequest', async () => {
        
        const badUser = {
          name: 'Jacquinzinho',
          password: '1234567890',
        };
        let response = await postUser(badUser);
        expect(response).to.have.status(400);

        badUser.email = 'erickjacquinmail.com';
        response = await postUser(badUser);
        expect(response).to.have.status(400);
        
        badUser.email = 'erickjacquin@mail';
        response = await postUser(badUser);
        expect(response).to.have.status(400);
      });
      it('Deve retornar um objeto { message: "Invalid entries. Try again." }', async () => {
        const badUser = {
          name: 'Jacquinzinho',
          password: '1234567890',
        };
        response = await postUser(badUser);
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');

        badUser.email = 'erickjacquinmail.com';
        response = await postUser(badUser);
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');

        badUser.email = 'erickjacquin@mail';
        let response = await postUser(badUser);
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
    describe('Ao omitir a "senha", ou passar uma senha inválida', () => {
      it('Deve retornar o status 400, BadRequest', async () => {
        
        const badUser = {
          email: 'erickjacquin@mail.com',
          name: 'Jacquinzinho',
        };
        let response = await postUser(badUser);
        expect(response).to.have.status(400);

        badUser.email = 'erickjacquinmail.com';
        response = await postUser(badUser);
        expect(response).to.have.status(400);
        
        badUser.email = 'erickjacquin@mail';
        response = await postUser(badUser);
        expect(response).to.have.status(400);
      });
      it('Deve retornar um objeto { message: "Invalid entries. Try again." }', async () => {
        const badUser = {
          password: '1234567890',
          name: 'Jacquinzinho',
        };
        response = await postUser(badUser);
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      });
    });
    describe('Quando se insere um email já existente no banco', () => {
  
      const goodUser = {
        name: 'Jacquinzinho',
        password: '1234567890',
        email: 'erickjacquin@mail.com',
      };

      let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
      
      const goodUser = {
        name: 'Jacquinzinho',
        password: '1234567890',
        email: 'erickjacquin@mail.com',
      };
      
      response = await postUser(goodUser);
    }); 
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
  });

      it('Deve devolver http status 409 e um objeto { message: "Email already registered" } ', () => {
        expect(response).to.have.status(409);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal('Email already registered');
      });

    });
    
  });
  describe('Quando se espera que o cadastro seja feito:', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
      );

      sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
      
      const goodUser = {
        name: 'Jacquinzinho',
        password: '1234567890',
        email: 'erickjacquin@mail.com',
      };
      
      response = await postUser(goodUser);
    }); 
    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
  });

    describe('Ao se enviar um usuário corretamente', () => {
      it('Deve retornar o status 201', () => {
        expect(response).to.have.status(201);
      });
      it('Deve retornar um objeto com chave "user" com as informações de cadastro', () => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('name');
        expect(response.body.user.name).to.be.equal(goodUser.name);
        expect(response.body.user).to.have.property('email');
        expect(response.body.user.email).to.be.equal(goodUser.email);
      });
      it('Deve retornar uma chave role de valor "user"', () => {
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('role');
        expect(response.body.user.role).to.be.equal('user');
      })
      it('Deve retornar uma chave "_id" com um objectId válido', () => {
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('_id');
        expect(ObjectId(response.body.user).isValid())
          .to.be.equal(true);
      })
      it('Jamais deve retornar a senha', () => {
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.not.have.property('password');
      })
    });
  });
});
