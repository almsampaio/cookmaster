const { ObjectId } = require('mongodb');

const connection = require('./connection');

const create = async (recipe) => {
  const { name, ingredients, preparation, userId } = recipe;
  const db = await connection();
  const newRecipe = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return newRecipe;
};

const getAll = async () => {
  const db = await connection();
  const allRecipes = db.collection('recipes').find({}).toArray();
  return allRecipes;
};

const getById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(new ObjectId(id));
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
