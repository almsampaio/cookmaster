const { ObjectId } = require('mongodb');
const connection = require('./connection');

const existsEmail = async (email) => {
  const db = await connection();
  const isRegistered = await db.collection('users').findOne({ email });
  return isRegistered;
};

const getUserById = async (id) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ _id: ObjectId(id) });
  return user;
};

const createUser = async (name, email, password, role) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  return ({
    user: { _id: newUser.insertedId, name, email, role },
  });
};

module.exports = { existsEmail, createUser, getUserById };