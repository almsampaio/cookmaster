const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const RECIPES = 'recipes';

const isValidID = (id) => ObjectId.isValid(id);

const create = async (recipe) => {
  const db = await getConnection();
  const result = await db.collection(RECIPES).insertOne(recipe);

  return { recipe: result.ops[0] };
};

const getAll = async () => {
  const db = await getConnection();

  const sales = await db.collection(RECIPES).find({}).toArray();

  return sales;
};

const getById = async (id) => {
  if (!isValidID(id)) return null;

  const db = await getConnection();

  const recipe = await db.collection(RECIPES)
    .findOne({ _id: ObjectId(id) });

  return recipe;
};

module.exports = { create, getAll, getById };