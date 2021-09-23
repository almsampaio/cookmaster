const connection = require('./connection');

const coll = 'recipes';

const newRecipe = async (name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection(coll).insertOne({ name, ingredients, preparation }))
    .then((result) => result.ops[0]);
  
  return recipe;
};

const getRecipes = async () => {
  const recipe = await connection()
    .then((db) => db.collection(coll).find().toArray());
  
  return recipe;
};

module.exports = {
  newRecipe,
  getRecipes,
};
