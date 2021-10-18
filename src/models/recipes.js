const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const create = async (name, ingredients, preparations, userId) => {
  const connectDb = await getConnection();
  const { ops: newRecipe } = await connectDb.collection('recipes')
    .insertOne({ name, ingredients, preparations, userId });

  return newRecipe;
};

const getAll = async () => {
  const connectDb = await getConnection();
  const allRecipes = await connectDb.collection('recipes')
    .find({}).toArray();
  return allRecipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const connectDb = await getConnection();
  const recipe = await connectDb.collection('recipes')
    .findOnde({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
