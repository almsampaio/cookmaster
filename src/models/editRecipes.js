const mongoConnection = require('./connection');

module.exports = async (_id, body) => {
  const { name, ingredients, preparation } = body;
  const db = await mongoConnection.getConnection();
  await db.collection('recipes').updateOne(
    { _id },
    { $set: { name, ingredients, preparation } },
  );
};