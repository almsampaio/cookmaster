const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    describe('Email e Senha vazios', () => {
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
});