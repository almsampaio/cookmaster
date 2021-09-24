const connection = require('./connection');

const COLLECTION_NAME = 'users';

const userCollection = async () => {
  const db = await connection();
  const collection = await db.collection(COLLECTION_NAME);

  return collection;
};

module.exports = userCollection;
