const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await getConnection();

  const recipe = await db
    .collection('recipes')
    .insertOne(recipeData)
    .then((result) => result.ops[0]);

  return recipe;
};

const getAllRecipes = async () => {
  const db = await getConnection();

  const recipes = await db.collection('recipes').find({}).toArray();

  if (!recipes) return [];

  return recipes;
};

const getRecipeById = async (id) => {
  const db = await getConnection();

  if (!ObjectId.isValid(id)) return null;

  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  if (!recipe) return null;

  return recipe;
};

const editRecipe = async (id, data) => {
  const db = await getConnection();

  if (!ObjectId.isValid(id)) return null;

  const recipe = await db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { ...data } },
      { returnOriginal: false },
    );

  if (!recipe) return null;

  return recipe.value;
};

const deleteRecipe = async (id) => {
  const db = await getConnection();

  if (!ObjectId.isValid(id)) return null;

  const recipe = await db
    .collection('recipes')
    .findOneAndDelete({ _id: ObjectId(id) });

  if (!recipe) return null;
  return recipe.value;
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe };
