const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionName = 'users';

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .catch((err) => console.log(err));
  return sales;
};

const findById = async (id) => {
  const user = await connection()
    .then((db) => db.collection(collectionName).findOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
  return user;
};

const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection(collectionName).findOne({ email: { $eq: email } }))
    .catch((err) => console.log(err));
  return user;
};

const deleteById = async (id) => {
  await connection()
    .then((db) => db.collection(collectionName).deleteOne({ _id: { $eq: ObjectId(id) } }))
    .catch((err) => console.log(err));
};

const create = async (name, email, password, role) => {
  const db = await connection();
  const userCreated = await db.collection(collectionName)
    .insertOne({ name, email, password, role })
    .then((result) => ({ _id: result.insertedId, name, email, password, role }))
    .catch((err) => console.log(err));
  return userCreated;
};

const update = async (id, itensSold) => {
  const saleUpdated = await connection()
    .then((db) => db.collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
    .then(() => ({ _id: id, itensSold }))
    .catch((err) => console.log(err));
  return saleUpdated;  
};

module.exports = { getAll, findById, deleteById, create, update, findByEmail }; 