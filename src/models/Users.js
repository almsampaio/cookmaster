const connection = require('./connection');

const create = async (name, email, password) => {
  const operation = await connection();
  const result = await operation
    .collection('users').insertOne({ name, email, password, role: 'user' });
  return result;
};

module.exports = {
  create,
};