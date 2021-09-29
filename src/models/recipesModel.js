const { ObjectID } = require('bson');
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

const getRecipeById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};