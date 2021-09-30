const connection = require('./connection');

const addUser = async (userInfo) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne(userInfo);
  return newUser.ops[0];
};

const findByEmail = async (email) => {
  const db = await connection();
  const response = await db.collection('users').findOne({ email });
  if (!response) return null;
  return response;
};

module.exports = {
  addUser,
  findByEmail,
};
