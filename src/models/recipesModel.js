const mongoConnection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const recipeCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
  const { insertedId: _id } = await recipeCollection
    .insertOne({ name, ingredients, preparation, userId });
  
  return {
    _id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

module.exports = {
  create,
};
