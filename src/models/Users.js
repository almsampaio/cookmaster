const connection = require('../connections/dbConnection');

const createUser = async (name, email, password, role) => {
  const database = await connection();
  const result = await database.collection('users').insertOne({ name, email, password, role });
  return result.ops[0];
};

const findByEmail = async (email) => {
  const database = await connection();
  const result = await database.collection('users').findOne({ email });
  return result;
};

module.exports = {
  createUser,
  findByEmail,
};
