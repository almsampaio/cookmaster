const { ObjectId } = require('bson');
const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  const result = db.collection('recipes').find().toArray();
  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
};