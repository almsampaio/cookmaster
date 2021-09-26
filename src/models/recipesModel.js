const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connect().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

const getRecipeById = async (id) => {
  const result = await connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  await connect().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return { _id: ObjectId(id), name, ingredients, preparation };
};

const getRecipes = async () => {
  const result = await connect().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
