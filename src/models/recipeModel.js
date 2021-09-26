const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipe.insertedId,
  };
};

const listRecipes = async () => {
  const db = await connect();
  const list = await db.collection('recipes').find().toArray();
  return list;
};

module.exports = {
  createRecipe,
  listRecipes,
};
