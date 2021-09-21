const connection = require('./connection');

const createUser = async (name, email, password) => {
  const myUser = { name, email, password, role: 'user' };
  const db = await connection();
  const newUser = await db.collection('users').insertOne(myUser);
  return { _id: newUser.insertedId, name, email, role: 'user' };
};

const findUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  findUserByEmail,
  createUser,
};
