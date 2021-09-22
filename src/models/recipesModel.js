const { ObjectID } = require('bson');
const connect = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const db = await connect();
  const recipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find({}).toArray();
  // console.log(recipes);
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  console.log(id);
  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return recipe;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};
