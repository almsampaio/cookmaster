const connection = require('./connection');

const findOnebyEmail = async (email) => {
const db = await connection();
const result = await db.collection('users').findOne({ email });
return result;
};

const createUser = async (user) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ ...user, role: 'user' });
  return { insertedId: result.insertedId, user };
};

module.exports = {
  findOnebyEmail,
  createUser,
};