const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipe = await db
  .collection('recipes').insertOne({ name, ingredients, preparation, userId });
  return recipe;
};

const getAll = async () => {
  const db = await connect();
  const recipe = await db.collection('recipes').find().toArray();
  return recipe;
};

const getById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(_id) });
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
