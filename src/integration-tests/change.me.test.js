const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http')
const { expect } = require('chai');
chai.use(chaiHttp);
const app = require('../api/app');
const connection = require('./connectionMock');
const MongoClient = require('mongodb/lib/mongo_client');


describe('Testando /POST /login', () => {
    describe('Quando não tem username ou password informados: ', () => {
        let response;

        before(async () => {
            response = await chai.request(app).post('/login').send({});
        })

        it('retorna status 401', () => {
            expect(response).to.be.have.status(401);
        })

        it('retorna um objeto no body', () => {
            expect(response).to.be.an('object');
        })

        it('objeto de resposta deve ter uma propriedade chamada message:', () => {
            expect(response.body).to.have.a.property('message')
        })

        it('mensage de erro esperada: "All fields must be filled"', () => {
            expect(response.body.message).to.be.equal('All fields must be filled')
        })
    })


    describe('Quando username ou senha não conferem: ', () => {
        let connectionMock;
        let response;

        before(async () => {
            connectionMock = await connection();
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            response = await chai.request(app).post('/login').send({ 
                email: 'userFake',
                password: 'passFake'
            })
        });

        after(async () => {
            MongoClient.connect.restore();
        })

        it('retorna status 401', () => {
            expect(response).to.be.have.status(401);
        })

        it('retorna um objeto no body', () => {
            expect(response).to.be.an('object');
        })

        it('objeto de resposta deve ter uma propriedade chamada message:', () => {
            expect(response.body).to.have.a.property('message')
        })

        it('mensage de erro esperada: Incorrect username or password', () => {
            expect(response.body.message).to.be.equal('Incorrect username or password')
        })
    })

    describe('Quando não é preenchido um campo ou outro no login: ', () => {
        let connectionMock;
        let response;

        before(async () => {
            connectionMock = await connection();
            sinon.stub(MongoClient, 'connect').resolves(connectionMock);

            response = await chai.request(app).post('/login').send({ 
                password: 'passFake'
            })
        });

        after(async () => {
            MongoClient.connect.restore();
        });

        it('retorna status 401', () => {
            expect(response).to.have.status(401);
        })

        it('retorna a mensagem "All fields must be filled"', () => {
            expect(response.body.message).to.be.equal('All fields must be filled');
        })
    });

});
