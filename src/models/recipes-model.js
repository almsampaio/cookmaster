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

module.exports = { create, findRecipes, findById };
