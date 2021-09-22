const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { userId, _id: newRecipe.insertedId, name, ingredients, preparation } };
};

const getAllRecipes = async () => {
  const db = await connect();
  const allRecipes = await db.collection('recipes').find({}).toArray();
  return allRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
