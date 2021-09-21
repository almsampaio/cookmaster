const mongoConnection = require('./connection');

const getProductByEmail = async (email) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = getProductByEmail; 