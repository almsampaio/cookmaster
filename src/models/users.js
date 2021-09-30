// const { ObjectId } = require('mongodb');
const connection = require('../api/connection');

const modelCreate = async (userInfo) => {
  const { name, email, password } = userInfo;
  const role = 'user';
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ name, email, password, role });
  return { name, email, role, _id: insertedId };
};

const modelEmailFind = async (email) => {
  const db = await connection();
  const element = await db.collection('users').findOne({ email });
  return element;
};

module.exports = {
  modelCreate,
  modelEmailFind,
};