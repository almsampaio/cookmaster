const { getConnection } = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    },
  };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
