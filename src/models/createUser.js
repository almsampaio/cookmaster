const mongoConnection = require('./connection');

const createUser = async (body) => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('users').insertOne(body);
  const { password: remove, ...rest } = body;
   
  return { ...rest, _id: result.insertedId };
};

module.exports = createUser;