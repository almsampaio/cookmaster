const getConnection = require('./connection');

const createUser = async (name, email, password, role = 'user') => 
  getConnection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ _id: result.insertedId, name, email, role }))
    .then((user) => ({ user }));

const findByEmail = async (email) => {
  const db = await getConnection();
  const searchEmail = await db.collection('users').findOne({ email });
  if (!searchEmail) return null;
  return searchEmail; 
};
const login = async (email, password) => {
  const db = await getConnection();
  const result = await db.collection('users').insertOne({ email, password });
  return result;
};

module.exports = { createUser, findByEmail, login };
