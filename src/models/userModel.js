const connect = require('./connection');

const create = async (user) => {
  const db = await connect();
  const userCreated = await db.collection('users').insertOne({ ...user, role: 'user' });
  return { _id: user.insertedId, ...userCreated.ops[0] };
};

const findUserEmail = async (email) => {
  const db = await connect();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

module.exports = {
  create,
  findUserEmail,
};
