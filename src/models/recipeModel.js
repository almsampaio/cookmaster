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

const update = async (id, body, userId) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { body } }, userId);

  return { id, body, userId };
};

const exclude = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectId(_id) });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
