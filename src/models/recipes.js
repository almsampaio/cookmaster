const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ 
      recipe: { name, ingredients, preparation, userId, _id: result.insertedId },
    }));

const getAll = () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((result) => result);

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};
const update = async (data) => {
  const { id, name, ingredients, preparation } = data;
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return recipe;
};

module.exports = { 
  create,
  getAll,
  getById,
  update,
};