const connection = require('../api/connection');

const modelCreate = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const { insertedId } = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { name, ingredients, preparation, userId, _id: insertedId };
};

module.exports = {
  modelCreate,
};