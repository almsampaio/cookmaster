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

module.exports = {
  create,
};
