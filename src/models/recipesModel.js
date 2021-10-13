const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createdRecipe = await db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  );
  return { _id: createdRecipe.insertedId, name, ingredients, preparation, userId };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipeById = db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  // console.log(result);
  return result;
};

module.exports = { 
  create,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
