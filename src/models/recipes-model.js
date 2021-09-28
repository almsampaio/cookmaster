const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const createRecipe = await connect()
    .then((db) =>
      db
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }))
    .then(({ ops }) => ops[0]);

  return createRecipe;
};

const findRecipes = async () => {
  const recipes = await connect().then((db) =>
    db.collection('recipes').find({}).toArray());

  return recipes;
};

const findById = async (id) => {
  const recipe = await connect().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipe;
};

const updateRecipeById = async (recipe) => {
  const { id, name, ingredients, preparation } = recipe;
  const update = await connect().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      ));
  return update;
};

module.exports = { create, findRecipes, findById, updateRecipeById };
