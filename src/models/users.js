const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (data) => {
  const db = await getConnection();
  const createUser = await db.collection('users').insertOne({ ...data, role: 'user' });
  return { _id: createUser.insertedId, ...data, role: 'user' };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return {};
  const db = await getConnection(); 
  const user = await db.collection('users').findOne({ _id: ObjectId(id) });
  return user;
};

const getByEmail = async (email) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const createAdmin = async (data) => {
  const db = await getConnection();
  const createUser = await db.collection('users').insertOne({ ...data, role: 'admin' });
  return { _id: createUser.insertedId, ...data, role: 'admin' };
};

module.exports = {
  create,
  getByEmail,
  getById,
  createAdmin,
};