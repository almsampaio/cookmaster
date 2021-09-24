// const chai = require('chai');
// const sinon = require('sinon');

// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);

// const { MongoClient } = require('mongodb');
// const { getConnection } = require('./mockConnection');

// const { expect } = chai;

// const server = require('../api/server');

// describe('Update Recipes', () => {
//   let connectionMock;

//   before(async () => {
//     connectionMock = await getConnection();
//     sinon.stub(MongoClient, 'connect').resolves(connectionMock);

//     const usersCollection = await connectionMock.db('Cookmaster').collection('users');

//     await usersCollection.insertOne({
//       name: 'user',
//       email: 'user@trybe.com.br',
//       password: 'trybe123',
//       role: 'user',
//     });

//     const { _id } = await usersCollection.findOne({ name: user });

//     const recipesCollection = await connectionMock.db('Cookmaster').collection('recipes');

//     await recipesCollection.insertOne({
//       name: 'food',
//       ingredients: 'lots of salt',
//       preparation: 'just eat it',
//       userId: _id,
//     });
//   });

//   after(() => {
//     MongoClient.connect.restore();
//   });

//   describe('When there is no token', () => {
//     let response;

//     before(async () => {
//       response = await chai.request(server)
//       .put('/recipes/:id')
//       .set('authorization', '')
//       .send({
//         name: 'user Food',
//         ingredients: 'lots of salt',
//         preparation: '1 hr boiling',
//       });
//     });
    
//     it('Status 401', () => {
//       expect(response).to.have.status(401);
//     });

//     it('Expect message with proper content', () => {
//       expect(response.body.message).to.be.equal('missing auth token');
//     });
//   });
// });
