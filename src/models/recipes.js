const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const { ops } = await db.collection('recipes').insertOne(recipe);
  return { recipe: ops[0] };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const updatedRecipe = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return updatedRecipe.value;
};

const deleteRecipeById = async (id) => {
  const db = await connection();
  await db.collection('recipes').findOneAndDelete(
    { _id: ObjectId(id) },
  );
};

const addRecipeImageById = async (id) => {
  const db = await connection();
  const updatedRecipe = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } },
    { returnOriginal: false },
  );
  return updatedRecipe.value;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipeById,
  addRecipeImageById,
};