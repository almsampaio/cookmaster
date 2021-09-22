const connection = require('./connection');

const createRecipe = async (recipe, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({ ...recipe, userId });
  return { _id: result.insertedId, ...recipe, userId };
};

const getAllRecipes = async () => {
  const db = await connection();
  const result = db.collection('recipes').find().toArray();
  return result;
};

module.exports = {
createRecipe,
getAllRecipes,
};