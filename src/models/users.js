const connection = require('./connection');

const getAll = async () => {
  console.log('user-models');

  const users = await connection()
    .then((db) => db.collection('users').find().toArray());
  return users;
};

const create = async (name, email, password, role) => connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ user: { name, email, role, _id: result.insertedId } }));

const getByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }))
  .then((result) => result);

module.exports = { 
  getAll,
  create,
  getByEmail,
};