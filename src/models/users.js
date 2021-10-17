const connection = require('./connection');

const create = async (name, email, password) => {
  const db = await connection();
  const createUser = await db.collection('users').insertOne({ name, email, password });
  return createUser;
};

const getAll = async () => {
  const db = await connection();
  const allUsers = await db.collection('users').find({}).toArray();
  return allUsers;
};

const getByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  create,
  getAll,
  getByEmail,
};
