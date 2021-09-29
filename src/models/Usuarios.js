const connection = require('./Connection');

const registerUser = async (name, email, password) => {
  const db = await connection();
  const userCreated = await db.collection('users').insertOne({ name, email, password });
  return userCreated.ops[0];
};

const findUser = async (email) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

module.exports = {
  registerUser,
  findUser,
};
