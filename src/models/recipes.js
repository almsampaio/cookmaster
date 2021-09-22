const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = async (recipe) => {
  const connectionDb = await connection();
  const newRecipe = await connectionDb.collection('recipes')
  .insertOne(recipe);

  return newRecipe.ops[0];
};

const allRecipes = async () => {
  const connectionDb = await connection();

  const allRecipesArr = await connectionDb.collection('recipes')
  .find().toArray();
  return allRecipesArr;
};

const recipeId = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const connectionDb = await connection();

  const recipe = await connectionDb.collection('recipes')
  .findOne({ _id: ObjectId(id) });

  if (!recipe) return false;
  return recipe;
};

module.exports = {
  addRecipe,
  allRecipes,
  recipeId,
};
