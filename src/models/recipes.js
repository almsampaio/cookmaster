const connection = require('./connection');

const create = async (name, ingredients, preparation, user) => {
  const db = await connection();
  const { _id } = user;
  const createRecipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: _id });
  return createRecipe;
};

module.exports = {
  create,
};
