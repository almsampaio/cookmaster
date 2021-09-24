const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;


describe('User Tests', () => {
    const DBServer = new MongoMemoryServer();

    before(async () => {
        const URLMock = await DBServer.getUri();
        connection = await MongoClient.connect(URLMock, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        db = connection.db('Cookmaster');

        sinon.stub(MongoClient, 'connect')
        .resolves(connection);
    });

    after(async () => {
        MongoClient.connect.restore();
    });

    describe('Create User', () => {
        describe('quando é criado com sucesso', () => {
            let response = {};
     
            before(async () => {
     
                response = await chai.request(server)
                    .post('/users')
                    .send({
                        name: "Usuario Xablau",
                        email: "xablau@gmail.com",
                        password: "1234567"
                    });
            });
     
            it('retorna o código de status 201', () => {
                expect(response).to.have.status(201);
            });
     
            it('retorna um objeto', () => {
                expect(response.body).to.be.a('object');
            });
     
            it('o objeto possui a propriedade "user"', () => {
                expect(response.body).to.have.property('user');
            });
     
            it('a propriedade "user" é um objeto', () => {
                expect(response.body.user).to.be.a('object');
             });
     
            it('o objeto possui a propriedade "_id"', () => {
                 expect(response.body.user).to.have.property('_id');
            });
        });
    });
     
    describe('Login User', () => {
        describe('quando é Logado com sucesso', () => {
            let response;
     
            beforeEach( async () => {
                await db.collection('users').deleteMany({});
                const user = {
                    name: "Usuario Xablau",
                    email: "xablau@gmail.com",
                    password: "1234567"
                };
                await db.collection('users').insertOne(user);
    
                response = await chai.request(server)
                .post('/login')
                .send({
                    email: "xablau@gmail.com",
                    password: "1234567"
                });
            });
      
            it('retorna o código de status 200', async () => {
                expect(response).to.have.status(200);
            });
    
            it('retorna um objeto', () => {
                expect(response.body).to.be.a('object');
            });
    
            it('o objeto possui a propriedade "token"', () => {
                expect(response.body).to.have.property('token');
            });
        });
    }); 
    describe('Create Admin', () => {
        let token;
        before(async () => {
            await db.collection('users').deleteMany({});
            user = {
                name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
            await db.collection('users').insertOne(user);

            const login = await chai.request(server)
            .post('/login')
            .send({
                email: "root@email.com",
                password: "admin"
            });

            token = login.body.token;
        });

        describe('quando é criado com sucesso', () => {
            let response = {};
            
            beforeEach( async () => {
                await db.collection('users').deleteMany({});
                user = {
                    name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
                await db.collection('users').insertOne(user);

                response = await chai.request(server)
                .post('/users/admin')
                .set({authorization: token})
                .send({
                    name: 'usuario Administrador',
                    email: "user@email.com",
                    password: "1234567"
                });
            });
     
            it('retorna o código de status 201', () => {
                expect(response).to.have.status(201);
            });
     
            it('retorna um objeto', () => {
                expect(response.body).to.be.a('object');
            });
     
            it('o objeto possui a propriedade "user"', () => {
                expect(response.body).to.have.property('user');
            });
     
            it('a propriedade "user" é um objeto', () => {
                expect(response.body.user).to.be.a('object');
             });
     
            it('o objeto possui a propriedade "_id"', () => {
                 expect(response.body.user).to.have.property('_id');
            });
            it('o objeto possui a propriedade "role"', () => {
                expect(response.body.user).to.have.property('role');
           });
           it('A propriedade "role" tem valor admin', () => {
            expect(response.body.user.role).to.equal('admin');
       });
        });
    });
});

