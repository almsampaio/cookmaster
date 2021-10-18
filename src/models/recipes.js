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
    .findOne({ _id: ObjectId(id) });
  if (!recipe) return null;
  return recipe;
};

const update = async (id, dataBody, userId) => {
  const { name, ingredients, preparations } = dataBody;
  if (!ObjectId.isValid(id)) return null;
  const connectDb = await getConnection();
  await connectDb.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: { name, ingredients, preparations, userId } },
    );
  return { _id: id, name, ingredients, preparations, userId };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
