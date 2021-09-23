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

module.exports = {
  createRecipes,
  getAllRecipes,
};
