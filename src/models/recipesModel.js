const mongoConnect = require('./connection');

const create = async ({ name, ingredients, preparation }) => {
    const usersCollection = await mongoConnect.getConnection()
      .then((db) => db.collection('recipes'));
    const createdUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createdUser.insertedId,
    };
  };

const getAll = async () => {
  const recipesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('recipes'));
  const listRecipes = await recipesCollection.find().toArray();
  return listRecipes;
};

module.exports = { create, getAll };