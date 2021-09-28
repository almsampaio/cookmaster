const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => {
  const connect = await connection();

  const createdRecipe = await connect.collection('recipes')
  .insertOne({ name, ingredients, preparation });

  return {
    recipe: {
      _id: createdRecipe.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

const getAll = async () => {
  const connect = await connection();

  const getAllRecipes = await connect.collection('recipes').find().toArray();

  return getAllRecipes;
};

module.exports = {
  create,
  getAll,
};
