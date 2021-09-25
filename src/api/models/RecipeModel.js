const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createRecipe = async (recipeData, userId) => {
  const db = await getConnection();
  const result = await db
  .collection('recipes').insertOne({ ...recipeData, userId });
  return { ...recipeData, userId, _id: result.insertedId };
};

const getAll = async () => {
  const db = await getConnection();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
};

const getById = async (recipeId) => {
  if (!ObjectId.isValid(recipeId)) return null;
  const db = await getConnection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(recipeId) });
  return result;
};

const updateRecipe = async (id, data, idUser) => {
 const db = await getConnection();
 await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { ...data, idUser } });
  const result = await getById(id);
  return result;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
};