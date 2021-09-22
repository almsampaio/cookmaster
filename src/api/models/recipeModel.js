const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (recipeData, userId) => {
  const db = await connect();
  const recipe = await db.collection('recipes').insertOne({ ...recipeData, userId });
  return { _id: recipe.insertedId, ...recipeData, userId };
};

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const db = await connect();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};