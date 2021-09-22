const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return { _id: newRecipe.insertedId, name, ingredients, preparation };
};

const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
