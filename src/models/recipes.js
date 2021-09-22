const connectionRecipes = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) => connectionRecipes()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

module.exports = {
  createRecipe,
};