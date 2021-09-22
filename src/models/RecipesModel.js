const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return { _id: newRecipe.insertedId, name, ingredients, preparation };
};

const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
