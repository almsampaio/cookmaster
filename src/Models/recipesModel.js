const getConnection = require('./connections');

const createRecipes = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  console.log(create);
  const db = await getConnection();
  const newRecipe = await db.collection('recipes').insertOne(create);
  return ({ ...create, _id: newRecipe.insertedId });
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

module.exports = {
  createRecipes,
  getAllRecipes,
};