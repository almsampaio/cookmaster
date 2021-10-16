// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role: 'user' })
    .then((res) => ({ _id: res.insertedId, name, email }));

  return newUser;
};

const findEmail = async (email) => {
  const db = await connection();
  const searchEmail = await db.collection('users').findOne({ email });

  if (!searchEmail) return null;
  return searchEmail;
};

module.exports = {
  createUser,
  findEmail,
};
