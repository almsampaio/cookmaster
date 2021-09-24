const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

// REQUISITO 3

const createRecipes = async (recipe) => {
  const db = await connection();
  const user = await db.collection(COLLECTION_NAME).insertOne(recipe);
  return user.ops[0];
};

// REQUISITO 4

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection(COLLECTION_NAME).find({}).toArray();
  return recipes;
};

// REQUISITO 5

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
  return recipe;
};

// REQUISITO 7

const updateRecipe = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const db = await connection();
  await db.collection(COLLECTION_NAME).updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  const updatedRecipe = await db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(id) });
  return updatedRecipe;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
