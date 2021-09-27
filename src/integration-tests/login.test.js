const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect } = chai;

const server = require("../api/app");

describe('POST /login', () => {
 describe('When it is not inserted a user or password', () => {
   let response;
   before(async () => {
     response = await chai.request(server)
     .post('/login')
     .send({});
   });
   
   it('returns a code status "401"', () => {
     expect(response).to.have.status(401);
   });
   
   it('returns an object on body', () => {
     expect(response.body).to.be.an('object');
   });
   
   it('returns an object with the property "message"', () => {
     expect(response.body).to.have.property('message');
   });
   
   it('returns the property "message" with the value "All fields must be filled"', () => {
     expect(response.body.message).to.be.equals('All fields must be filled');
   });
 });
 
 describe('When the "user" does not exist or it is invalid', () => {
   before(async () => {
   });
   
   after(async () => {
   });
   
   it('retorna código de status "401"', () => {
   });
   
   it('retorna um objeto no body', () => {
   });
   
   it('objeto de resposta possui a propriedade "message"', () => {
   });
   
   it('a propriedade "message" tem o valor "Pessoa usuária não existe ou senha inválida"', () => {
   });
 });
 
 describe('Quando login é feito com sucesso', () => {
   before(async () => {
   });
   
   it('retorna código de status "200"', () => {
   });
   
   it('retorna um objeto no body', () => {
   });
   
   it('objeto de resposta possui a propriedade "message"', () => {
   });
   
   it('a propriedade "message" não está vazia', () => {
   });
 });
});