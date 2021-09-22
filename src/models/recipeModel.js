const connect = require('./connection');

const create = async (recipe) => {
  const db = await connect();
  const recipeCreated = await db.collection('recipes').insertOne({ ...recipe });
  return { _id: recipe.insertedId, ...recipeCreated.ops[0] };
};

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

module.exports = {
  create,
  getAll,
};
