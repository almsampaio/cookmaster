const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    let connectionMock;

    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect.restore();
    })

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
            const usersCollection = connectionMock.db('Cookmaster').collection('users')

            await usersCollection.insertOne({ name: "Willian", email: "willian@gmail.com", password: "123456789" });
            response = await chai.request(app).post('/login').send({ email: "invalid@email.com", password: "123456789" });
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
            const usersCollection = connectionMock.db('Cookmaster').collection('users')

            await usersCollection.insertOne({
                name: 'Willian',
                email: 'willian@gmail.com',
                password: '123456789',
                role: 'user',
            })

            response = await chai.request(app)
                .post('/login')
                .send({email: 'willian@gmail.com', password: '123456789'});
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
    let connectionMock;

    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect.restore();
    })

    describe('Name, Email e Password vazios', () => {
        let response;

        before(async () => {
            response = await chai.request(app).post('/users').send({});
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
        let response;

        before(async () => {
            const usersCollection = connectionMock.db('Cookmaster').collection('users');

            await usersCollection.insertOne({
                name: 'Willian',
                email: 'willian@gmail.com',
                password: '123456789',
                role: 'user',
            })

            response = await chai.request(app)
                .post('/users')
                .send({
                    name: "Willian",
                    email: "willian@gmail.com",
                    password: "123456789",
                    role: 'user',
                });
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
            const usersCollection = connectionMock.db('Cookmaster').collection('users');

            response = await chai.request(app)
                .post('/users')
                .send({
                    name: "Willian",
                    email: "willian3@gmail.com",
                    password: "123456789",
                    role: 'user',
                });
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
            expect(response.body.user).to.have.property("role");
        });

        it('a propriedade "token" possui o texto "Incorrect username or password"',() => {
            expect(response.body.user.name).to.be.equal("Willian");
            expect(response.body.user.email).to.be.equal("willian3@gmail.com");
            expect(response.body.user.role).to.be.equal("user");
        });
    });
});
