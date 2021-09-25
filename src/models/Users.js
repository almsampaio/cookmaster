const connection = require('./connection');

const create = async (name, email, password) => {
  const db = await connection();
  const role = 'user';
  const newUser = await db.collection('users').insertOne({ user: { name, email, password, role } });
  return { user: { name, email, role, _id: newUser.insertedId } };
};

const getByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ 'user.email': email });
  return user;
};

module.exports = {
  create,
  getByEmail,
};