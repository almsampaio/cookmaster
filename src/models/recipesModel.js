const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const create = db.collection('recipes').insertOne(recipe);
  return { _id: create.insertedId, recipe };
};

const getRecipes = async () => {
  const db = await connection();
  const recipe = db.collection('recipes').find().toArray();
  return recipe;
};

const getRecipeById = async (_id) => {
  if (!ObjectId.isValid(_id)) return null;
  const db = await connection();
  const findId = db.collection('recipes').findOne(ObjectId(_id));
  return findId;
};

module.exports = { createRecipe, getRecipes, getRecipeById };
