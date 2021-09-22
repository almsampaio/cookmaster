// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createRecipes = async ({ name, ingredients, preparation }, payload) => {
  const { _id } = payload;
  const userId = _id;
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));

  const inserted = await usersCollection.insertOne({ name, ingredients, preparation, userId })
    .then((res) => res.ops[0]);

  if (!inserted.name) return { error: true };
  return { recipe: inserted };
};

const getAllRecipes = async () => {
  const getAll = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes').find().toArray()); 

  if (!getAll.length) return { error: true };
  console.log(getAll);
  return getAll;
};

module.exports = {
  createRecipes,
  getAllRecipes,
};