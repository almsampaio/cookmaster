const { dbConnection } = require('./connection');
// const { ObjectId } = require('mongodb');

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

module.exports = {
  create,
  searchEmails,
};
