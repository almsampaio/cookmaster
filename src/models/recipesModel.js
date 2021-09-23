const connection = require('./connection');

const collectionName = 'recipes';

async function register(recipe) {
  const db = await connection();
  const { insertedId } = await db.collection(collectionName).insertOne(recipe);

  return insertedId;
}

module.exports = {
  register,
};
