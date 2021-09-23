const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const findByName = async (name) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ name });

  if (!recipe) return null;

  return recipe;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
 await getConnection()
    .then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));

  const { _id } = await findByName(name);
  const data = { _id, name, ingredients, preparation, userId };
  return { recipe: data };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await getConnection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  if (!recipe) return null;

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
}; 