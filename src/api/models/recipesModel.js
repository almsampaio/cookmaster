const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  });
  
  return { recipe: newRecipe.ops[0] };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  if (recipes) return recipes;
  return {};
};

module.exports = {
  createRecipes,
  getRecipes,
};
