const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const insertedRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { _id: insertedRecipe.insertedId, name, ingredients, preparation, userId };
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
