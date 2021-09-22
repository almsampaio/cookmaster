const mongoConnection = require('./connection');

module.exports = async (_id) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('recipes').findOne({ _id });
  return result;
};