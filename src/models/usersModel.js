const connection = require('../../seed');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('users').find().toArray();
  return result;
};

const findByEmail = async (mail) => {
  const db = await connection();
  const result = await db.collection('users').find({ email: mail }).toArray();
  return result;
};

const create = async (user) => {
  const db = await connection();
  const { ops } = await db.collection('users').insertOne(user);
  return ops[0];
};

module.exports = {
  getAll,
  create,
  findByEmail,
};
