const connection = require('./connection');

const searchByEmail = async (email) => {
  const db = await connection();

  const search = await db.collection('users').findOne({ email });
  return search;
};

const createUser = async (name, email, password) => {
  const db = await connection();
  
  const createNewUser = await db.collection('users')
  .insertOne({ name, email, password, role: 'user' });
  
  const { password: _, ...dataWithoutPassword } = createNewUser.ops[0];
  return { user: dataWithoutPassword };
};

const searchByPassword = async (password) => {
  const db = await connection();

  const search = await db.collection('users').findOne({ password });
  return search;
};

const searchUserByID = async (_id) => {
  const db = await connection();
  const search = await db.collection('users').findOne({ _id });
  return search;
};

module.exports = {
  searchByEmail,
  createUser,
  searchByPassword,
  searchUserByID,
};
