const getConnection = require('./connection');

const create = async (data) => {
  const db = await getConnection();
  const createUser = await db.collection('users').insertOne({ ...data, role: 'user' });
  return { _id: createUser.insertedId, ...data, role: 'user' };
};

const getUserByEmail = async (email) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  create,
  getUserByEmail,
};