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

module.exports = {
  create,
  searchEmails,
  getAll,
  getById,
};
