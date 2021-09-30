const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return { name, ingredients, preparation, userId, _id: newRecipe.insertedId };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

module.exports = {
  create,
  getAll,
};