const { ObjectId } = require('bson');
const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  const result = db.collection('recipes').find().toArray();
  return result;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  const result = await getRecipeById(id);
  return result;
};

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};