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

module.exports = {
  create,
};
