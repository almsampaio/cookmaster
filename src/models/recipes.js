const connectionRecipes = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) => connectionRecipes()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getRecipes = () => connectionRecipes()
  .then((db) => db.collection('recipes').find({}).toArray());

module.exports = {
  createRecipe,
  getRecipes,
};