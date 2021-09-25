const connection = require('./connection');

const createRecipe = (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }))
  .then((result) => result.ops[0])
  .catch((e) => console.log(e));

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
};
