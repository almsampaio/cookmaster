const { getConnection } = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await getConnection();

  const recipe = await db
    .collection('recipes')
    .insertOne(recipeData)
    .then((result) => result.ops[0]);

  return recipe;
};

const getAllRecipes = async () => {
  const db = await getConnection();

  const recipes = await db.collection('recipes').find({}).toArray();

  if (!recipes) return [];

  return recipes;
};

module.exports = { createRecipe, getAllRecipes };
