const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const users = db.collection('users').find().toArray();

  return users;
};

const getByEmail = async (email) => {
  const db = await connect();
  const userEmail = await db.collection('users').findOne({ email });

  return userEmail;
};

const create = async (name, email, password, role) => {
  const db = await connect();
  const user = db.collection('users').insertOne({ name, email, password, role });

  return { name, email, role, _id: user.insertedId };
};

module.exports = { getAll, getByEmail, create };
