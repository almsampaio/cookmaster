const connection = require('./connection');

const createUser = async (name, email, password) => {
  const myUser = { name, email, password, role: 'user' };
  const db = await connection();
  const newUser = await db.collection('users').insertOne(myUser);
  return { _id: newUser.insertedId, name, email, role: 'user' };
};

const createAdmin = async (name, email, password) => {
  const admin = { name, email, password, role: 'admin' };
  const db = await connection();
  const newAdmin = await db.collection('users').insertOne(admin);
  return { _id: newAdmin.insertedId, name, email, role: 'admin' };
};

const findUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  findUserByEmail,
  createUser,
  createAdmin,
};
