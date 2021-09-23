const connection = require('./connection');

const create = async (user) => {
  return connection()
    .then((db) => db.collection('users').insertOne({...user, role: 'user'}))
    .then(result => result.ops[0]);
}

const findUserByEmail = async (email) => {
  return connection()
    .then((db) => db.collection('users').findOne({email}))
    .then(result => result || null);
}

module.exports = {
  create,
  findUserByEmail,
}