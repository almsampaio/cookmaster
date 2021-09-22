const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async ({ name, ingredients, preparation, recipeId, userId }) => {
  if (!ObjectId.isValid(recipeId)) return false;

  const db = await getConnection();
  const { value } = await db.collection('recipes').findOneAndUpdate(
    {
      $and: [
        { _id: ObjectId(recipeId) },
        { userId: { $eq: userId } },
      ],
    },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return value;
};

const updateRecipeAsAdmin = async ({ name, ingredients, preparation, recipeId }) => {
  if (!ObjectId.isValid(recipeId)) return false;

  const db = await getConnection();
  const { value } = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(recipeId) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  updateRecipeAsAdmin,
  deleteRecipe,
};
