const connection = require('./connection');

const addUsers = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return { user: result.ops[0] };
};

const getUsersByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  addUsers,
  getUsersByEmail,
};
