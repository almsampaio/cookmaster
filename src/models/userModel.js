const mongoConnection = require('./connection');

const getAll = async () => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('users'));

  const response = await productCollection.find().toArray();

  return response;
};

const create = async ({ name, email, password, role }) => {
  const productCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const { insertedId: id } = await productCollection
    .insertOne({ name, email, password, role });

  return {
    name,
    email,
    role,
    _id: id,
  };
};

const getByEmail = async (email) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('users'));

  const response = await productCollection.findOne({ email });

  return response;
};

module.exports = {
  getAll,
  create,
  getByEmail,
};