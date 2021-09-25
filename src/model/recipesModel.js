const connection = require('./connection');

const createRecipe = (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }))
  .then((result) => result.ops[0])
  .catch((e) => console.log(e));

module.exports = {
  createRecipe,
};
