const connection = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({
    userId,
    name,
    ingredients,
    preparation,
  });

  const recipes = result.ops[0];
  console.log(recipes);
  return {
    recipes,
  };
};

module.exports = {
  createRecipe,
};
