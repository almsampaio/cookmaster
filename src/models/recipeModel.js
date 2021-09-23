const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipe = await db
  .collection('recipes').insertOne({ name, ingredients, preparation, userId });
  return recipe;
};

module.exports = {
  create,
};
