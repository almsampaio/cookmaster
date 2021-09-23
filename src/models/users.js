const connection = require('./connection');

const create = async (name, email, password) => {
  const { insertedId } = await connection()
    .then((db) => db
      .collection('users')
      .insertOne({ name, email, password, role: 'user' }));
  return { user: { name, email, role: 'user', _id: insertedId } };
};

const find = async (email) => {
  const searchEmail = await connection()
    .then((db) => db
      .collection('users')
      .findOne({ email }));
  return searchEmail;
};

module.exports = { create, find };
