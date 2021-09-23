const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const findById = async (id) => {
  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const getAll = async () => {
  const db = await connect();
  const recipe = await db.collection('recipes').find({}).toArray();
  return recipe;
};

const updateRecipe = async (id, data, userId) => {
  const db = await connect();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...data, userId } });
  const updatedRecipe = await findById(id);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connect();
  await db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
};
