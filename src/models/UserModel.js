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
      name,
      email,
      ...role,
    },
  };
};

const createAdmin = async (user) => {
  const { name, email, password } = user;

  const role = { role: 'admin' };

  const usersCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const { insertedId: _id } = await usersCollection.insertOne(
    { name, email, password, ...role },
  );

  return {
    user: {
      _id,
      name,
      email,
      ...role,
    },
  };
};

const findByEmail = async (email) => {
  const usersCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const emailFound = await usersCollection.findOne({ email });

  return emailFound;
};

// const findByUsername = async (username) => {
//   const usersCollection = await mongoConnection.getConnection()
//   .then((db) => db.collection(COLLECTION_NAME));

//   const usernameFound = usersCollection.findOne({ username });

//   return usernameFound;
// };

module.exports = {
  createAdmin,
  create,
  findByEmail,
  // findByUsername,
};