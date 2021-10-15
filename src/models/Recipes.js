const { ObjectId } = require('mongodb');
const connection = require('../connections/dbConnection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const database = await connection();
  const recipe = await database.collection('recipes').insertOne({ 
    name, ingredients, preparation, userId });
  return recipe.ops[0];
};

const getAll = async () => {
  const database = await connection();
  const recipesList = await database.collection('recipes').find().toArray();
  return recipesList;
};

const getById = async (id) => {
  const database = await connection();
  const recipe = await database.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const database = await connection();
  const updatedRecipe = await database.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return updatedRecipe.value;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
};
