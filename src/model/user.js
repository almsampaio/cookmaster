const { ObjectId } = require('mongodb');
const connection = require('./connection');

const emailAlreadyUsed = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return user;
};
const newUser = async (name, email, password) => {
  const result = await connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }));
  const { role, _id } = result.ops[0];
  const userWithoutPass = { user: { 
    name: result.ops[0].name,
    email: result.ops[0].email,
    role,
    _id,
  } };
  return (userWithoutPass);
};

const checkingLogin = async (email, password) => {
  const result = await connection()
  .then((db) => db.collection('users')
    .findOne({ email, password }));
  return result;
};

const findOneUser = async (userId) => {
  if (!ObjectId.isValid(userId)) return null;
  const user = await connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(userId) }));
  return user;
};

const getAll = async () => {
  const users = await connection()
    .then((db) => db.collection('users').find({}).toArray());
  return users;
};

module.exports = {
  newUser,
  emailAlreadyUsed,
  checkingLogin,
  findOneUser,
  getAll,
};