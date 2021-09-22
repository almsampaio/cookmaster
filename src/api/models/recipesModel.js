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
  console.log(recipe);
  return {
    recipe,
  };
};

module.exports = {
  createRecipe,
};
