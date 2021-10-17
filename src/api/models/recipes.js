const { ObjectID } = require('mongodb');
const connection = require('./index');

const createRecipe = async (data) => {
  const recipe = await connection().then((db) =>
  db.collection('recipes').insertOne(data));
  return { recipe: recipe.ops[0] };
};

const getAll = async () => {
  const recipes = await connection().then((db) =>
  db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipe = async (id) => {
  const recipe = await connection().then((db) =>
  db.collection('recipes').findOne(new ObjectID(id)));
  return recipe;
};

const updateRecipe = async (id, data) => {
  await connection().then((db) =>
  db.collection('recipes')
  .findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' }))
  .then((result) => result.value);
};

module.exports = { createRecipe, getAll, getRecipe, updateRecipe };