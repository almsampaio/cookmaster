const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    const DBServer = new MongoMemoryServer();
    let connectionMock;

    before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    describe('Email e Password vazios', () => {
        let response;

        before(async () => {
            response = await chai.request(app).post('/login').send({})
        });

        it('retorna o código de status 401', () => {
            expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "message"', () => {
            expect(response.body).to.have.property('message');
        });

        it('a propriedade "message" possui o texto "All fields must be filled"',() => {
            expect(response.body.message).to.be.equal('All fields must be filled');
        });
    });

    describe('Email e Password inexistentes no banco de dados', () => {
        let response;

        before(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .insertOne({ name: "invalid", email: "test@invalid.com", password: "invalid" });

            response = await chai.request(app).post('/login').send({
                email: "test@invalid.com",
                password: "invalid",
            });
        });

        after(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .deleteMany({ email: 'test@invalid.com' })
        });

        it('retorna o código de status 401', () => {
            expect(response).to.have.status(401);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "message"', () => {
            expect(response.body).to.have.property('message');
        });

        it('a propriedade "message" possui o texto "Incorrect username or password"',() => {
            expect(response.body.message).to.be.equal('Incorrect username or password');
        });
    });

    describe('Email e Password validos', () => {
        let response;

        before(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .insertOne({ name: "Name valid", email: "test@valid.com", password: "valid" });

            response = await chai.request(app).post('/login').send({
                email: "test@valid.com",
                password: "valid",
            });
        });

        after(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .deleteMany({ email: 'test@valid.com' })
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

        it('a propriedade "token" possui o texto "eyJhb"',() => {
            expect(response.body.token.substr(0, 5)).to.be.equal('eyJhb');
        });
    });
});

describe('POST /users', () => {
    const DBServer = new MongoMemoryServer();

    before(async () => {
        const URLMock = await DBServer.getUri();
        connectionMock = await MongoClient.connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true });

        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
        await DBServer.stop();
    });

    describe('Name, Email e Password vazios', () => {
        let response;

        before(async () => {
            response = await chai.request(app).post('/users').send({})
        });

        it('retorna o código de status 400', () => {
            expect(response).to.have.status(400);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "message"', () => {
            expect(response.body).to.have.property('message');
        });

        it('a propriedade "message" possui o texto "Invalid entries. Try again."',() => {
            expect(response.body.message).to.be.equal('Invalid entries. Try again.');
        });
    });

    describe('Email já cadastrado', () => {
        let connectionMock;
        let response;

        before(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .insertOne({ name: "test", email: "test@invalid.com", password: "invalid" });

            response = await chai.request(app).post('/users').send({
                name: "test",
                email: "test@invalid.com",
                password: "invalid",
            });
        });

        after(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .deleteMany({ email: 'test@invalid.com' })
        });

        it('retorna o código de status 409', () => {
            expect(response).to.have.status(409);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "message"', () => {
            expect(response.body).to.have.property('message');
        });

        it('a propriedade "message" possui o texto "Email already registered"',() => {
            expect(response.body.message).to.be.equal('Email already registered');
        });
    });

    describe('Dados validos', () => {
        let response;

        before(async () => {
            response = await chai.request(app).post('/users').send({
                name: "Name valid",
                email: "test@valid.com",
                password: "valid",
            });
        });

        after(async () => {
            await connectionMock.db('Cookmaster').collection('users')
                .deleteMany({ email: 'test@invalid.com' })
        });

        it('retorna o código de status 201', () => {
            expect(response).to.have.status(201);
        });

        it('retorna um objeto', () => {
            expect(response.body).to.be.a('object');
        });

        it('o objeto possui a propriedade "user"', () => {
            expect(response.body.user).to.have.property("name");
            expect(response.body.user).to.have.property("email");
            expect(response.body.user).to.have.property("password");
        });

        it('a propriedade "token" possui o texto "Incorrect username or password"',() => {
            expect(response.body.user.name).to.be.equal("Name valid");
            expect(response.body.user.email).to.be.equal("test@valid.com");
            expect(response.body.user.password).to.be.equal("valid");
        });
    });
});
