const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

const addURecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  );
  return {
    recipe:
      { name, ingredients, preparation, userId, _id: recipe.insertedId },
  };
};

const updateRecipe = async (recipeToUpdateParameters) => {
  const { id, name, ingredients, preparation, userId } = recipeToUpdateParameters;
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipeToUpdate = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, userId } },
    { returnOriginal: false },
  );
  return recipeToUpdate.value;
};

const checkRecipeOwner = async (id, userId) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  if (recipe.userId === userId) return true;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addURecipes,
  updateRecipe,
  checkRecipeOwner,

};