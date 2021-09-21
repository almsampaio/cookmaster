const connect = require('./connection');

const createUser = async (name, email, password) => {
  const role = 'user';
  const db = await connect();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { _id: newUser.insertedId, name, email, role } };
};

const findUserByEmail = async (email) => {
  const db = await connect();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

module.exports = {
  createUser,
  findUserByEmail,
};
