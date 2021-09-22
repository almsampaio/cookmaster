const { getConnection } = require('./connection');

const RECIPES = 'recipes';

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

module.exports = { create, getAll };