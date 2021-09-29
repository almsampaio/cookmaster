// const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const searchByEmail = async (email) => {
  const db = await getConnection();
  const search = await db.collection('users').findOne({ email });
  return search;
};

const create = async (name, email, password) => {
  const db = await getConnection();

  const createUser = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });

  return { user: { name, email, role: 'user', _id: createUser.insertedId } };
};

module.exports = {
  create,
  searchByEmail,
};