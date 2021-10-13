const connection = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connection();
  const createdUser = await db.collection('users').insertOne({ name, email, password, role });
  return { _id: createdUser.insertedId, name, email, role };
};

const getUsers = async () => {
  const db = await connection();
  const users = await db.collection('users').find().toArray();
  return users;
};

const getByEmail = async (email) => {
  const db = await connection();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

const getByEmailAndPassword = async (email, password) => {
  const db = await connection();
  const existingUser = await db.collection('users').findOne({ email, password });
  return existingUser;
};

module.exports = { 
  create,
  getUsers,
  getByEmail,
  getByEmailAndPassword,
};
