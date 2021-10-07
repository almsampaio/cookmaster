const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = async (recipeInfo) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(recipeInfo);
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
};
