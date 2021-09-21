// const { ObjectId } = require('bson');
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

// const getById = async (id) => {
//   const productCollection = await mongoConnection.getConnection()
//   .then((db) => db.collection('products'));

//   const response = await productCollection.find({ _id: new ObjectId(id) }).toArray();

//   return response;
// };

// const update = async (id, { name, quantity }) => {
//   const productCollection = await mongoConnection.getConnection()
//   .then((db) => db.collection('products'));

//   const response = await productCollection.updateOne(
//     { _id: new ObjectId(id) },
//     { $set: { name, quantity } },
//   );

//   return response;
// };

// const deleteById = async (id) => {
//   const productCollection = await mongoConnection.getConnection()
//   .then((db) => db.collection('products'));

//   const response = await productCollection.deleteOne({ _id: new ObjectId(id) });

//   return response;
// };

module.exports = {
  getAll,
  create,
  // getById,
  // update,
  // deleteById,
};