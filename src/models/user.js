const connection = require('./connection');

const createUser = async (name, password, email) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, password, email, role: 'user' });
  return {
    name,
    email,
    role: 'user',
    _id: newUser.insertedId,
  };
};

const findEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const findPassword = async (password) => connection()
  .then((db) => db.collection('users').findOne({ password }));

module.exports = {
  createUser,
  findEmail,
  findPassword,
};
