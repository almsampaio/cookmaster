const mongoConnection = require('./connection');

module.exports = async (email) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').findOne({ email });
  return result;
};
