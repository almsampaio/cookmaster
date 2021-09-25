const connection = require('./connection');

const createNewUser = async (name, email, password) => {
const result = await connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return result;
};

const findUserByEmail = async (email) => {
  const result = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  return result;
};

module.exports = {
  createNewUser,
  findUserByEmail,
};