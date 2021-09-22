// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createRecipes = async ({ name, ingredients, preparation }, payload) => {
  const { _id } = payload;
  const userId = _id;
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));

  const inserted = await usersCollection.insertOne({ name, ingredients, preparation, userId })
    .then((res) => res.ops[0]);

  return { recipe: inserted };
};

module.exports = {
  createRecipes,
};