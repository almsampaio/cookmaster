const mongoConnect = require('./connection');

const create = async ({ name, email, password, role }) => {
    const userCollection = await mongoConnect.getConnection()
      .then((db) => db.collection('users'));
    const createUser = await userCollection.insertOne({ name, email, password, role });

    return {
      name,
      email,
      password,
      role,
      id: createUser.insertedId,
    };
  };

const filterByEmail = async (email) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return userCollection;  
};
  
const filterByUser = async ({ email, password }) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('users').findOne({ email, password }));

  return userCollection;  
};

  module.exports = { create, filterByEmail, filterByUser };