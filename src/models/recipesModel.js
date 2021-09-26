const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connect().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

const getRecipes = async () => {
  const result = await connect().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
};
