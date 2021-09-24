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
  console.log(name, user);

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

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getRecipeById,
};
