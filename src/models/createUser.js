const mongoConnection = require('./connection');

const createUser = async (body) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').insertOne(body);
  return { ...body, _id: result.insertedId };
};

module.exports = createUser;