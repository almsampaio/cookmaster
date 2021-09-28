const { ObjectID } = require('bson');
const connection = require('./connection');

const userValidation = async (id, userId) => {
  const db = await connection();
  const valid = await db.collection('recipes').findOne(ObjectID(id), ObjectID(userId));
  if (valid) return true;
  return null;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const insertedRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { _id: insertedRecipe.insertedId, name, ingredients, preparation, userId };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  return db.collection('recipes').findOne(ObjectID(id));
};

const update = async (recipeData) => {
  const { id, name, ingredients, preparation, userId } = recipeData;
  const valid = userValidation(id, userId);
  if (!valid) return null;
  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, ingredients, preparation } });
  return { _id: ObjectID(id), name, ingredients, preparation, userId };
};

const remove = async (id, userId) => {
  const valid = userValidation(id, userId);
  if (!valid) return null;
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectID(id) });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
