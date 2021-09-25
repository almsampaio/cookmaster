const { getConnection } = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await getConnection();

  const recipe = await db
    .collection('recipes')
    .insertOne(recipeData)
    .then((result) => result.ops[0]);

  return recipe;
};

module.exports = { createRecipe };
