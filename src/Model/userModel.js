const connect = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connect();
  const findUser = await db.collection('users').findOne({ email });
  if (findUser) return { statusCode: 409 };
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  return { _id: userCreated.insertedId, name, email, role: 'user' };
};

const err = true;

const login = async (email, password) => {
  const db = await connect();
  const findEmail = await db.collection('users').findOne({ email });
  if (!findEmail) return ({ err });
  if (findEmail.password !== password) return ({ err });
  return ({ email, password });
};

const verifyEmail = async (email) => {
  const db = await connect();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

const createAdm = async (name, email, password, role) => {
  const db = await connect();
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  return { _id: userCreated.insertedId, name, email, role: 'admin' };
};

module.exports = {
  create,
  login,
  verifyEmail,
  createAdm,
};