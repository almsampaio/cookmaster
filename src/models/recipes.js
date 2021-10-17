const connection = require('./connection');

const create = async (name, ingredients, preparation, user) => {
  const db = await connection();
  const { _id } = user;
  const createRecipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: _id });
  return createRecipe;
};

const getAll = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find({}).toArray();
  return allRecipes;
};

module.exports = {
  create,
  getAll,
};
