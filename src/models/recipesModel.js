const { ObjectId } = require('mongodb');
const connection = require('./connection');

const generalDB = async () => {
  const data = await connection().then((db) => db.collection('recipes'));
  return data;
};

const addNewRecipe = async (recipeData) => {
  const {
    user,
    name,
    ingredients,
    preparation,
  } = recipeData;

  const data = await generalDB();

  const { _id } = user;

  const userId = _id;

  return data.insertOne({ name, ingredients, preparation, userId })
      .then((result) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: result.insertedId,
      }));
};

const getAllRecipes = async () => {
  const data = await generalDB();

  return data.find().toArray();
};

const getRecipeById = async (id) => {
  const data = await generalDB();

  const recipe = await data.findOne(new ObjectId(id));

  if (!recipe) throw new Error('recipe not found');

  return recipe;
};

const updateRecipe = async (id, newData) => {
  const data = await generalDB();

  const recipeId = new ObjectId(id);

  const recipe = await data
        .findOneAndUpdate({ _id: recipeId }, { $set: newData }, { returnDocument: 'after' })
        .then((result) => result.value);

  if (!recipe) throw new Error('recipe not found');

  const updatedRecipe = await data.findOne(new ObjectId(id));
  return updatedRecipe;
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
