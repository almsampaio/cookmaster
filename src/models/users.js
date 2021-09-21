const connection = require('./connection');

const registerUser = async ({ name, password, email }) => {
  const db = await connection();

  const { ops } = await db.collection('users').insertOne({
    name,
    password,
    email,
    role: 'user',
  });

  return ops[0];
};

const getEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });

  return result;
};

module.exports = {
  registerUser,
  getEmail,
};
