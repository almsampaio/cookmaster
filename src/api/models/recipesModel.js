const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

// REQUISITO 3

const createRecipes = async (recipe) => {
  const db = await connection();
  const user = await db.collection(COLLECTION_NAME).insertOne(recipe);
  return user.ops[0];
};

module.exports = {
  createRecipes,
};
