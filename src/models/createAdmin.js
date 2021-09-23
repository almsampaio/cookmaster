const mongoConnection = require('./connection');

module.exports = async (body) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').insertOne(body);
  const { password: remove, ...rest } = body;
   
  return { ...rest, _id: result.insertedId };
};