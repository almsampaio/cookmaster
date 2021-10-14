const connection = require('../connections/dbConnection');

const createUser = async (name, email, password, role) => {
  const database = await connection();
  const result = await database.collection('users').insertOne({ name, email, password, role });
  return result.ops[0];
};

const findUser = async (email, password) => {
  const query = password ? { email, password } : { email };
  const database = await connection();
  const result = await database.collection('users').findOne(query);
  return result;
};

module.exports = {
  createUser,
  findUser,
};
