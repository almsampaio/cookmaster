const connect = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const db = await connect();
  const recipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find({}).toArray();
  console.log(recipes);
  return recipes;
};

module.exports = {
  create,
  getAllRecipes,
};
