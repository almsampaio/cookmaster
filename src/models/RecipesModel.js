const connection = require('./Connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return newRecipe.ops[0];
};

module.exports = {
  createRecipe,
};
