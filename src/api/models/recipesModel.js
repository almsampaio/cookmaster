const connection = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({
    userId,
    name,
    ingredients,
    preparation,
  });

  const recipe = result.ops[0];
  return {
    recipe,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

// const getAll = async () => connection()
//     .then((db) => db.collection('products').find().toArray())
//     .then((result) => (result));

module.exports = {
  createRecipe,
  getAllRecipes,
};
