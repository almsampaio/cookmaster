const connection = require('./connection');

const create = async (newUser, role = 'user') => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ ...newUser, role });
  const { password: _, ...newUserData } = user.ops[0];
  
  return newUserData;
};

const findByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user;
};

module.exports = {
  create,
  findByEmail,
};