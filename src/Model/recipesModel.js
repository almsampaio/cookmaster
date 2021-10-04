const connect = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  createRecipe,
};