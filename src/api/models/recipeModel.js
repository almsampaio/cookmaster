const { getConnection } = require('./connection');

const RECIPES = 'recipes';

const create = async (recipe) => {
  const db = await getConnection();
  const result = await db.collection(RECIPES).insertOne(recipe);

  return { recipe: result.ops[0] };
};

module.exports = { create };