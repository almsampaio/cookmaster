const getConnection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const result = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, userId, _id: result.insertedId } };
};

module.exports = {
  createRecipe,
};