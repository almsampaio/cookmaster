const connection = require('./index');

const createRecipe = async (data) => {
  const recipe = await connection().then((db) =>
  db.collection('recipes').insertOne(data));
  delete recipe.ops[0].password;
  return { recipe: recipe.ops[0] };
};

module.exports = { createRecipe };