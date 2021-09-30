// const { ObjectId } = require('mongodb');
const connection = require('../api/connection');

const modelPasswordCompare = async (password, email) => {
  const db = await connection();
  const element = await db.collection('users').findOne({ email, password });
  return element;
};

module.exports = {
  modelPasswordCompare,
};