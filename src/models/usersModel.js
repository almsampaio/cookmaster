const mongoConnection = require('./connection');

const create = async (name, email, password) => {
  const role = 'user';
  const usersCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('users'));
  const { insertedId: _id } = await usersCollection
    .insertOne({ name, email, password, role });
  const user = { _id, name, email, role };
  return {
    user,
  };
};

const getByEmail = async (email) => {
  const usersCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('users'));

  const userByEmail = await usersCollection.findOne({ email });
  return userByEmail;
};

module.exports = {
  create,
  getByEmail,
};
