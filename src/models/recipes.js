const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, user) => {
  const db = await connection();
  const { _id } = user;
  const createRecipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: _id });
  return createRecipe;
};

const getAll = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find({}).toArray();
  return allRecipes;
};

const getById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(new ObjectId(id));
  return recipe;
};

const updateRecipe = async (recipe) => {
  const db = await connection();
  const { _id, name, ingredients, preparation } = recipe;
  const updatedRecipe = await db
    .collection('recipes')
    .updateOne({ _id: ObjectId(_id) }, { $set: { name, ingredients, preparation } });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
};
