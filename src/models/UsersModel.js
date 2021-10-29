const connection = require('./Connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password });
  return newUser.ops[0];
};

const findUser = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUser,
};
