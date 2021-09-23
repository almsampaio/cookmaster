const mongoConnection = require('./connection');

module.exports = async (id) => {
  const db = await mongoConnection.getConnection();
  await db.collection('recipes').deleteOne({ _id: id });
};