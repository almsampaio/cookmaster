const connection = require('./connection');

const addRecipe = async (recipe) => {
  const connectionDb = await connection();
  const newRecipe = await connectionDb.collection('recipes')
  .insertOne(recipe);

  return newRecipe.ops[0];
};

const allRecipes = async () => {
  const connectionDb = await connection();

  const allRecipesArr = await connectionDb.collection('recipes')
  .find().toArray();
  return allRecipesArr;
};

module.exports = {
  addRecipe,
  allRecipes,
};
