const getConnection = require('./connections');

const createRecipes = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  console.log(create);
  const db = await getConnection();
  const newRecipe = await db.collection('recipes').insertOne({ create });
  return ({ ...create, _id: newRecipe.insertedId });
};

module.exports = {
  createRecipes,
};