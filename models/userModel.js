const { ObjectID } = require('bson');
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

const create = async (name, email, password, role) => {
  const newUser = await connection().then((db) => db
  .collection('users').insertOne({ name, email, password, role: role || 'user' }))
  .then((res) => {
    console.log(res, 'create user Model');
    const { password: _, ...user } = res.ops[0];
    return {
      ...user,
    };
  }).catch((err) => console.log(err));

  return newUser;
};

const findUser = async (username) => {
  const soughtUser = await connection().then((db) => db
  .collection('users').findOne({ username })).then((res) => res)
  .catch((err) => console.log(err));

  return soughtUser;
};

const getUser = async (email) => {
  const soughtUser = await connection().then((db) => db
  .collection('users').findOne({ email })).then((res) => (
    res === null 
   ? ({ message: 'User not found' }) : (
    { data: res }))).catch((err) => console.log(err));

  return soughtUser;
};

const getUserByPassword = async (password) => {
  const soughtUser = await connection().then((db) => db
  .collection('users').findOne({ password })).then((response) => (
    response === null 
   ? ({ message: 'User not found' }) : (
    { data: response }))).catch((err) => console.log(err));

  return soughtUser;
};

const findUserByEmail = async (email) => {
  const soughtUser = await connection().then((db) => db
  .collection('users').findOne({ email })).then((res) => {
    const { password: _, ...user } = res;
   return res === null 
   ? ({ message: 'User not found' }) : (
    { data: user }); 
}).catch((err) => console.log(err));

  return soughtUser;
};

module.exports = {
  getAll,
  getById,
  create,
  findUser,
  findUserByEmail,
  getUser,
  getUserByPassword,
};
