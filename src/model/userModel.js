// const { ObjectID } = require('mongodb');
const connect = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connect();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });

  return { _id: user.insertedId, name, email, password, role: 'user' };
};

const findAll = async () => {
  const db = await connect();
  const users = await db.collection('users').find().toArray();

  return users;
};

const findByEmail = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  addUser,
  findAll,
  findByEmail,
};
