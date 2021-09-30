const { ObjectId } = require('mongodb');
const connection = require('../api/connection');

const modelCreate = async (name, quantity) => {
  const db = await connection();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  return { _id: insertedId, name, quantity };
};

module.exports = {
  modelCreate,
}