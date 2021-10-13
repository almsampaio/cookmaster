const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createdRecipe = await db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  );
  return { _id: createdRecipe.insertedId, name, ingredients, preparation, userId };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipeById = db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

module.exports = { 
  create,
  getRecipes,
  getRecipeById,
};
