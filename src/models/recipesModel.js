const connection = require('./connection');

const recipesSubmit = async ({ name, ingredients, preparation }, userId) => {
    const db = await connection();
    const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    const { insertedId: _id } = newRecipe;
    return { recipe: { name, ingredients, preparation, userId, _id } };
};

const getRecipesModels = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

module.exports = {
  recipesSubmit,
  getRecipesModels,
};
