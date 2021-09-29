const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userID) => {
  const db = await connection();

 const createNewRecipe = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: createNewRecipe.ops[0] };
};
const getRecipes = async () => {
  const recipes = await connection().then((db) =>
    db.collection('recipes').find({}).toArray());
  // console.log(recipes);
  return recipes;
};

module.exports = {
  createRecipe,
  getRecipes,
};