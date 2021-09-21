const mongoConnection = require('./connection');

const COLLECTION_NAME = 'users';

const create = async (user) => {
  const { name, email, password } = user;

  const role = { role: 'user' };

  const usersCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const { insertedId: _id } = await usersCollection.insertOne(
    { name, email, password, ...role },
  );

  return {
    user: {
      _id,
      ...user,
      ...role,
    },
  };
};

module.exports = {
  create,
};