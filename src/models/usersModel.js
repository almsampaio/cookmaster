const connection = require('./connection');

const collectionName = 'users';

async function register(user) {
  const db = await connection();
  const { insertedId } = await db.collection(collectionName).insertOne(user);

  return insertedId;
}

async function getByEmail(email) {
  const db = await connection();
  const user = await db.collection(collectionName).findOne({ email });

  return user;
}

module.exports = {
  register,
  getByEmail,
};
