const connection = require('./connection');

const create = async (name, email, password) => {
  const db = await connection();
  const role = 'user';
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  return { name, email, role, _id: newUser.insertedId };
};

const getByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  create,
  getByEmail,
};