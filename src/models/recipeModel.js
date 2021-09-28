const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (recipe) => {
  const db = await connect();
  const recipeCreated = await db.collection('recipes').insertOne({ ...recipe });
  return { _id: recipe.insertedId, ...recipeCreated.ops[0] };
};

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipeData = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeData;
};

const update = async (id, recipe, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } });
  const recipeToUpdate = await getById(id);
  return { ...recipeToUpdate, userId };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const addImage = async (id, filename, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { userId, image: `localhost:3000/src/uploads/${filename}` } });
  const recipeToUpdate = await getById(id);
  return recipeToUpdate;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  addImage,
};
