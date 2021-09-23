const mongoConnection = require('./connection');

const getAllRecipes = async () => {
  const connection = await mongoConnection();
  const result = await connection.collection('recipes').find({}).toArray();

  return result;
};

const createRecipe = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  
  const connection = await mongoConnection();
  const result = await connection.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

    return { _id: result.insertedId, name, ingredients, preparation, userId };
};

module.exports = {
  getAllRecipes,
  createRecipe,
};
