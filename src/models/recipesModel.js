const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const create = db.collection('users').insertOne(recipe);
  return { _id: create.insertedId, recipe };
};

module.exports = { createRecipe };
