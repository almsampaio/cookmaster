const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (data, userId) => {
  const db = await getConnection();
  const createRecipes = await db.collection('recipes').insertOne({ ...data, userId });
  return { _id: createRecipes.insertedId, ...data, userId };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};