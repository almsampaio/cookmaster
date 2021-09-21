const connection = require('./connection');

const collectionName = 'users';

async function register(user) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const { insertedId } = await collection.insertOne(user);

  return insertedId;
}

async function getByEmail(email) {
  const collection = await connection().then((db) => db.collection(collectionName));
  const user = await collection.findOne({ email });

  return user;
}

module.exports = {
  register,
  getByEmail,
};
