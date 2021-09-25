const connection = require('./connection');

const createRecipeM = async ({ name, ingredients, preparation, userId }) => {
  const createdRecipe = await connection().then((db) => db
    .collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  return createdRecipe;
};

const getAllRecipesM = async () => {
  const recipesFound = await connection().then((db) => db
    .collection('recipes').find({}).toArray())
    .then((res) => res).catch((err) => console.log(err));
  return recipesFound;
};

module.exports = {
  createRecipeM,
  getAllRecipesM,
};