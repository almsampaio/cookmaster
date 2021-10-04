const { ObjectId } = require('bson');
const connect = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipe = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const update = async (recipeDetails) => {
  const { id, name, ingredients, preparation, userId } = recipeDetails;
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
  update,
};