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

const updateRecipe = async ({ name, ingredients, preparation, id }) => {
  if (!ObjectId.isValid(id)) return false;

  const db = await getConnection();
  const { value } = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnDocument: 'after' },
  );
  return value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
