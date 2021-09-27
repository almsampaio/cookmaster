const connection = require('./connection');

const create = (email, password, name, role) => connection()
  .then((db) => db.collection('users').insertOne(
    {
      email,
      password,
      name,
      role: !role ? 'user' : role,
    },
  ))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('users').find().toArray());

module.exports = {
  create,
  getAll,
};