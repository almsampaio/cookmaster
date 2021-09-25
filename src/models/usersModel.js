const connect = require('./connection');

const getUserByEmail = async (email) => {
  console.log('get user by email model');
  const db = await connect();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const addUser = async (name, email, password) => {
  const db = await connect();
  const result = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  console.log('Model');
  return { user: result.ops[0] };
};

module.exports = { getUserByEmail, addUser };
