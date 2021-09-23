const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation) => {
  const newRecipe = await connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }));

  return newRecipe.ops[0];
};

const getAll = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};