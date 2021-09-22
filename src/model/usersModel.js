const { ObjectId } = require('mongodb');
const connection = require('./connection');
//
const createUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    role: "user",
  }))
  .then((result) => result.ops[0])
  .catch((e) => console.log(e));

module.exports = {
  createUser,
};
