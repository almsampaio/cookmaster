// userModel
const connection = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connection();
  const findName = await db.collection('users').findOne({ email });
  if (findName) return { statusCode: 409 };
  const result = await db.collection('users').insertOne({ name, email, password, role });
  return { _id: result.insertedId, name, email, password, role };
};

module.exports = {
  create,
};