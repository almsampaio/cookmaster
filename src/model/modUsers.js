const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const insert = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return { user: insert.ops[0] }; // filtragem do dado recebido 
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const find = await db.collection('users').findOne({ email });
  return find;
};

module.exports = {
  createUser,
  getUserByEmail,
};
