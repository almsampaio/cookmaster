const mongoConnection = require('./connection');

const create = async ({ name, ingredients, preparation }) => {
    const usersCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('recipes'));
    const createdUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createdUser.insertedId,
    };
  };

module.exports = { create };