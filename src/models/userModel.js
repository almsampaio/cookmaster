const { connection } = require('../connection/connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const userCreated = await db.collection('users').insertOne({ name, email, password });
  return userCreated.ops[0];
};

const findByUsername = async (username) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ username });
  return userData;
};

const findEmail = async (email) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

const findPassword = async (password) => {
  const db = await connection();
  const data = await db.collection('users').findOne({ password });
  return data;
};

module.exports = { 
  createUser, 
  findByUsername,
  findEmail,
  findPassword,
};
