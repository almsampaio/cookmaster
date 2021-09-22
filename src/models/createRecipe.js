const mongoConnection = require('./connection');

module.exports = async (body) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('recipes').insertOne(body);
   
  return { _id: result.insertedId, ...body };
};