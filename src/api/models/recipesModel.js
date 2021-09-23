const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};

module.exports = { create, getAll };
