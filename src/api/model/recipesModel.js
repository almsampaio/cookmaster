const { ObjectId } = require('mongodb');
const { conn } = require('./conn');

const COLLECTION = 'recipes';

const create = async ({ name, ingredients, preparation }) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipe = await dbConn.insertOne({ name, ingredients, preparation });
  return {
    recipe: recipe.ops[0],
  };
};

const get = async () => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipes = await dbConn.find({}).toArray();
  return recipes;
};

const getById = async (id) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipe = await dbConn.findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = { create, get, getById };
