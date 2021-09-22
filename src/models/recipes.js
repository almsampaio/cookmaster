const connection = require('./connection');

const addRecipe = async (recipe) => {
  const connectionDb = await connection();

  const newRecipe = await connectionDb.collection('users')
  .insertOne(recipe);

  return newRecipe.ops[0];
};

module.exports = {
  addRecipe,
};
