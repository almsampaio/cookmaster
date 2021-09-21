const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');


const getAllUsers= async (email) => {
  const getById = await mongoConnection.getConnection()
  .then((db) => db.collection('users').find({ _id: ObjectId(id) }).toArray())
      .then((products) => products.map(serialize));


const getUserByEmail = async (email) => {
  const getById = await mongoConnection.getConnection()
  .then((db) => db.collection('users').find({ _id: ObjectId(id) }).toArray())
      .then((products) => products.map(serialize));

  
module.exports = {
  // postUsers,
}
