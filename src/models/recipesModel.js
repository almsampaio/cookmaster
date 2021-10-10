const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = async (recipeInfo) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(recipeInfo);
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
};

const updateRecipe = async (id, newRecipeInfo) => {
  const db = await connection();
  return db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: newRecipeInfo });
};

const deleteRecipe = async (id) => {
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
