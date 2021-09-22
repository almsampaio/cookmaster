const connection = require('./connection');

const create = async (recipe) => {
  const { name, ingredients, preparation, userId } = recipe;
  const db = await connection();
  const newRecipe = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return newRecipe;
};

module.exports = {
  create,
};
