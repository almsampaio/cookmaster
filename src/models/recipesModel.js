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

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const updatedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return updatedRecipe;
  };

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
  updateRecipe,
  deleteRecipe,
};
