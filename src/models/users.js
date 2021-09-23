const connect = require('./connection');

const createUser = async (name, email, password, role) => {
  const db = await connect();
  const insertUser = await db.collection('users')
  .insertOne({ name, email, password, role });

  const user = { _id: insertUser.insertedId, name, email, role };
  return user;
};

const findByEmail = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findByEmail,
};
