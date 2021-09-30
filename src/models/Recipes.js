const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

const update = async (id, updatedRecipe) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: updatedRecipe },
  );

  return getById(id);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return null;
};

const uploadFile = async (id, imageName) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { image: imageName } },
  );

  return getById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  uploadFile,
};