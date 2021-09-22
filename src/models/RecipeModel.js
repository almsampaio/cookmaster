const mongoConnection = require('./connection');

const COLLECTION_NAME = 'recipes';

const create = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;

  const recipeCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const { insertedId: _id } = await recipeCollection.insertOne(
    { name, ingredients, preparation },
  );

  return {
    recipe: {
      _id,
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