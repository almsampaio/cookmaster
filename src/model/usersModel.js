const connection = require('./connection');
//
const createUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  }))
  .then((result) => result.ops[0])
  .catch((e) => console.log(e));

const findByEmail = async (email) => connection()
  .then((db) => db.collection('users').find({ email }).toArray())

module.exports = {
  createUser,
  findByEmail,
};
