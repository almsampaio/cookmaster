const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

const recipesCollection = async () => {
  const db = await connection();
  const collection = await db.collection(COLLECTION_NAME);

  return collection;
};

module.exports = recipesCollection;
