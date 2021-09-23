const connect = require('./connection');

const getEmail = async (email) => {
  const db = await connect();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const create = async (name, email, password) => {
  const db = await connect();
  const users = await db
  .collection('users').insertOne({ name, email, password, role: 'user' });
  return users;
};

const login = async (email, password) => {
  const db = await connect();
  const users = await db
  .collection('users').findOne({ email, password });
  return users;
};

module.exports = {
  getEmail,
  create,
  login,
};
