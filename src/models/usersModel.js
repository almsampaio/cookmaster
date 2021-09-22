const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'users';

const findById = async (id) => {
  const user = await connection()
    .then((db) => db.collection(collectionName).findOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
  return user;
};

const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection(collectionName).findOne({ email: { $eq: email } }))
    .catch((err) => console.log(err));
  return user;
};

const create = async (name, email, password, role) => {
  const db = await connection();
  const userCreated = await db.collection(collectionName)
    .insertOne({ name, email, password, role })
    .then((result) => ({ _id: result.insertedId, name, email, role }))
    .catch((err) => console.log(err));
  return userCreated;
};

module.exports = { findById, create, findByEmail }; 