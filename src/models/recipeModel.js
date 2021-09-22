const connect = require('./connection');

const create = async (recipe) => {
  const db = await connect();
  const recipeCreated = await db.collection('recipes').insertOne({ ...recipe });
  return { _id: recipe.insertedId, ...recipeCreated.ops[0] };
};

module.exports = {
  create,
};
