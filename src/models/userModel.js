const connection = require('./connection');

const create = async (name, email, password) => {
  const role = 'user';
  const db = await connection();
  const insertedUser = await db.collection('users').insertOne({ name, email, password, role });
  return { name, email, role, _id: insertedUser.insertedId };
};

const findEmail = async (email) => {
  const db = await connection();
  return db.collection('users').findOne({ email });
};

const login = async (email, password) => {
  const db = await connection();
  const userLogin = await db.collection('users').findOne({ email, password });
  if (!userLogin) return null;
  return { id: userLogin.id, email, role: userLogin.role };
};

module.exports = {
  create,
  findEmail,
  login,
};
