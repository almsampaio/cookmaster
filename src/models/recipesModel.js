const connection = require('./connection');

const addRecipe = async (recipeInfo) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(recipeInfo);
  return newRecipe.ops[0];
};

module.exports = {
  addRecipe,
};
