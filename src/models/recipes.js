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

const updateRecipeId = async (obj) => {
  const { id, name, ingredients, preparation } = obj;
  if (!ObjectId.isValid(id)) return false;

  const connectionDb = await connection();

const update = await connectionDb.collection('recipes')
.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

if (!update) return false;

  return { ...update.value, ...obj };
};

const deleteRecipeId = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const connectionDb = await connection();

const deleteOne = await connectionDb.collection('recipes')
.findOneAndDelete({ _id: ObjectId(id) });

// if (!deleteOne) return false;
console.log(deleteOne);
return deleteOne;
};

module.exports = {
  addRecipe,
  allRecipes,
  recipeId,
  updateRecipeId,
  deleteRecipeId,
};
