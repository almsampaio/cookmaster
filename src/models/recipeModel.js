const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (recipe) => {
  const db = await connect();
  const recipeCreated = await db.collection('recipes').insertOne({ ...recipe });
  return { _id: recipe.insertedId, ...recipeCreated.ops[0] };
};

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipeData = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeData;
};

module.exports = {
  create,
  getAll,
  getById,
};
