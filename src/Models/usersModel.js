const getConnection = require('./connections');

const createUser = async (name, email, password) => {
  const db = await getConnection();
  const create = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return ({ _id: create.insertedId, name, email, role: 'user' });
};

const getAllUsersEmail = async (email) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  createUser,
  getAllUsersEmail, 
};