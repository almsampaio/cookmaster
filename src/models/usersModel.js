const connection = require('./connection');

const createUsers = async (user) => {
  const db = await connection();
  const create = db.collection('users').insertOne(user);
  return { _id: create.insertedId, user };
};

const findEmail = async (email) => {
  const db = await connection();
  const find = db.collection('users').findOne({ email });
  return find;
};

module.exports = { createUsers, findEmail };