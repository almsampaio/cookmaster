const connection = require('./connection');

const collectionName = 'recipes';

async function register(recipe) {
  const db = await connection();
  const { insertedId } = await db.collection(collectionName).insertOne(recipe);

  return insertedId;
}

async function getAll() {
  const db = await connection();
  const recipes = await db.collection(collectionName).find().toArray();

  return recipes;
}

module.exports = {
  register,
  getAll,
};
