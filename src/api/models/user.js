const connection = require('./connect');

const create = async (name, email, password, role) => {
  const db = await connection();
  const insertUsers = await db.collection('users')
    .insertOne({ name, email, password, role });
  const result = { _id: insertUsers.insertedId, name, email, role };
  return result;
};

const readEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const readEmailPassword = async (email, password) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email, password });
  return result;
};

module.exports = {
  create,
  readEmail,
  readEmailPassword,
};