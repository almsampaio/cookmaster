// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertUser = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  const { password: _, ...userWithNoPassword } = result.ops[0];
  return userWithNoPassword;
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  insertUser,
  getUserByEmail,
};