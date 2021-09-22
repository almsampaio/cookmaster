const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { userId, _id: newRecipe.insertedId, name, ingredients, preparation } };
};

const getAllRecipes = async () => {
  const db = await connect();
  const allRecipes = await db.collection('recipes').find({}).toArray();
  return allRecipes;
};

const getRecipeByID = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipeById = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
};
