const { ObjectID } = require('bson');
const connect = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const users = await connection().then((db) => db
  .collection('users').find({}).toArray()).then((res) => {
    console.log(res, 'getAll users Model');
    return res;
  }).catch((err) => console.log(err));

  return users;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const user = await connection().then((db) => db
  .collection('users').findOne({ _id: ObjectID(id) }))
  .then((res) => {
    console.log(res, 'getById user Model');
    return res;
  }).catch((err) => console.log(err));
  return user;
};

const create = async (name, email, password) => {
  const newUser = await connection().then((db) => db
  .collection('users').insertOne({ name, email, password, role: 'user' }))
  .then((res) => {
    console.log(res, 'create user Model');
    return res.ops[0];
  }).catch((err) => console.log(err));

  return newUser;
};

const findUser = async (username) => {
  const soughtUser = await connection().then((db) => db
  .collection('users').findOne({ username })).then((res) => res)
  .catch((err) => console.log(err));

  return soughtUser;
};

module.exports = {
  getAll,
  getById,
  create,
  findUser,
};
