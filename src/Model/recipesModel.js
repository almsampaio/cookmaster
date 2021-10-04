const connect = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipe = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipe,
};