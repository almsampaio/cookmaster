const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();

  const { ops } = await db.collection('recipes').insertOne(recipeData);

  return ops[0];
};

module.exports = {
  createRecipe,
};
