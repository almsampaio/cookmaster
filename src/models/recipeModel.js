const { ObjectID } = require('bson');
const connection = require('./connection');

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

module.exports = {
  create,
  getAll,
  getById,
};
