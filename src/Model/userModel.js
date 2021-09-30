// userModel
const connection = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connection();
  const findUser = await db.collection('users').findOne({ email });
  if (findUser) return { statusCode: 409 };
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  return { _id: userCreated.insertedId, name, email, role: 'user' };
};
module.exports = {
  create,
};
