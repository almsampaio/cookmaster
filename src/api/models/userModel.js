// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connect();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return { name, email, role, _id: user.insertedId };
};

module.exports = {
  create,
};