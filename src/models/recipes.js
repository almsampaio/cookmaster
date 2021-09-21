const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (data, userId) => {
  const db = await getConnection();
  const createRecipes = await db.collection('recipes').insertOne({ ...data, userId });
  return { _id: createRecipes.insertedId, ...data, userId };
};

const getAll = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const update = async (id, data, userId) => {
  const db = await getConnection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { ...data, userId } });
  const recipe = await getById(id);
  return recipe;
};

const remove = async (id) => {
  const db = await getConnection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};