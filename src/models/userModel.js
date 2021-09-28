const connection = require('./connection');

const createUser = async (name, email, password, role = 'user') => {
  const userList = await connection();
  const newUser = await userList.collection('users').insertOne({ name, email, password });
  return { user: { _id: newUser.insertedId, name, email, role } };
};

const getByUserEmail = async (email) => {
  const userList = await connection();
  const userEmail = await userList.collection('users').findOne({ email });
  return userEmail;
};

module.exports = {
  createUser,
  getByUserEmail,
};