const { ObjectId } = require('mongodb');
const connection = require('../api/connection');

const modelCreate = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const { insertedId } = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return { name, ingredients, preparation, userId, _id: insertedId };
};

const modelGetAll = async () => {
  const db = await connection();
  const info = await db.collection('recipes').find().toArray();
  return info;
};

const modelGetById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const info = await db.collection('recipes').findOne(ObjectId(id));
  return info;
};

const modelUpdate = async (recipeInfo, id) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return modelGetById(id);
};

const modelDelete = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const modelUpload = async (file, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image: file } });
  return modelGetById(id);
};

module.exports = {
  modelCreate,
  modelGetAll,
  modelGetById,
  modelUpdate,
  modelDelete,
  modelUpload,
};