const connection = require('../api/connection');

const modelCreate = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const { insertedId } = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { name, ingredients, preparation, userId, _id: insertedId };
};

const modelGetAll = async () => {
  const db = await connection();
  const info = await db.collection('recipes').find().toArray();
  return info;
};

module.exports = {
  modelCreate,
  modelGetAll,
};