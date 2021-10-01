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

module.exports = {
  addRecipe,
  getAllRecipes,
};
