const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getAllUsers = async (email) => {
  const getAll = await mongoConnection.getConnection()
  .then((db) => db.collection('users').find().toArray()); 
};

const getUserByEmail = async (email) => {
  const getByEmail = await mongoConnection.getConnection()
  .then((db) => db.collection('users').find({ email }).toArray()); 
};

const postUsers = async ({ name, email, password }) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const inserted = await usersCollection.insertOne({ name, email, password })
    .then((res) => res.ops[0]);
  return { user: inserted };
};

module.exports = {
  postUsers,
};
