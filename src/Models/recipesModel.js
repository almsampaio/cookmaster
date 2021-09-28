const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const createRecipes = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  console.log(create);
  const db = await getConnection();
  const newRecipe = await db.collection('recipes').insertOne(create);
  return ({ ...create, _id: newRecipe.insertedId });
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipesId = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesId,
};