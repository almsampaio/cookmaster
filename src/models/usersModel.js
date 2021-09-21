const connection = require('./connection');

const findByEmail = async ({ email }) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });

  return result;
};

const userRegistration = async ({ name, email, password }) => {
  const db = await connection();
  const newRegister = await db.collection('users').insertOne({ name, email, password });

  return { user: { _id: newRegister.insertedId, name, email, role: 'user' } };
};

module.exports = {
  findByEmail,
  userRegistration,
};