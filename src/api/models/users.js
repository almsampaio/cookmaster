// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

// const getAllUsers = async () => {
//   const getAll = await mongoConnection.getConnection()
//   .then((db) => db.collection('users').find().toArray()); 
// };

const getUserByEmail = async (email) => {
  const getByEmail = await mongoConnection.getConnection()
  .then((db) => db.collection('users').find({ email }).toArray()); 

  return getByEmail;
};

const createUsers = async ({ name, email }) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const inserted = await usersCollection.insertOne({ name, email, role: 'user' })
    .then((res) => res.ops[0]);

  return { user: inserted };
};

module.exports = {
  createUsers,
  getUserByEmail,
};
