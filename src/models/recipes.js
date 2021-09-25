const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (userId, name, ingredients, preparation) => {
  const { insertedId: _id } = await connection()
    .then((db) => db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

module.exports = { create, getAll, getOne };
