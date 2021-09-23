const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (data, userId) => {
  const db = await getConnection();
  const createRecipes = await db.collection('recipes').insertOne({ ...data, userId });
  return { _id: createRecipes.insertedId, ...data, userId };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, data, userId) => {
  const db = await getConnection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { ...data, userId } });
  const recipe = await getRecipeById(id);
  return recipe;
};

const removeRecipe = async (id) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipe;
};

const addRecipeImage = async (id, img) => {
  const db = await getConnection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { img } });
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  addRecipeImage,
};