const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name, ingredients, preparation, userId,
  });
  
  return { recipe: newRecipe.ops[0] };
};

module.exports = {
  createRecipes,
};
