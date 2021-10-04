const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /recipes', () => {
    let connectionMock;

    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
        MongoClient.connect.restore();
    })

    describe('Name, Ingredients, Preparation vazios', () => {
        let response;

        before(async () => {
            response = await chai.request(app).post('/recipes').send({})
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
});
