const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();

  const { ops } = await db.collection('recipes').insertOne(recipeData);

  return ops[0];
};

const getRecipes = async () => {
  const db = await connection();

  const result = await db.collection('recipes').find({}).toArray();

  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const result = await db.collection('recipes').findOne(ObjectId(id));

  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};
