const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection().then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
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

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeUpdate = await connection().then((db) => db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    ));

  return recipeUpdate.value;
};

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));

  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
};