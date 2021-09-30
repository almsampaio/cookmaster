const { ObjectId } = require('mongodb');

const { dbConnection } = require('./connection');

const create = async (collection, payload) => {
  const cnt = await dbConnection();
  const { ops: [insertedData] } = await cnt.collection(collection)
    .insertOne({ ...payload }); 

  return insertedData;
};

const searchEmails = async (email) => {
  const cnt = await dbConnection();
  const searchResult = cnt.collection('users').findOne({ email: { $eq: email } });

  return searchResult;
};

const getAll = async (collection) => {
  const cnt = await dbConnection();
  const searchResult = cnt.collection(collection).find().toArray();

  return searchResult;
};

const getById = async (collection, id) => {
  const cnt = await dbConnection();
  const searchResult = cnt.collection(collection).findOne({ _id: { $eq: ObjectId(id) } });

  return searchResult;
};

const updateById = async (collection, id, payload) => {
  const cnt = await dbConnection();
  const updateResult = cnt.collection(collection)
    .updateOne({ _id: { $eq: ObjectId(id) } }, { $set: { ...payload } });

  return updateResult;
};

const deleteById = async (collection, id) => {
  const cnt = await dbConnection();
  const updateResult = cnt.collection(collection)
    .deleteOne({ _id: { $eq: ObjectId(id) } });

  return updateResult;
};

module.exports = {
  create,
  searchEmails,
  getAll,
  getById,
  updateById,
  deleteById,
};
