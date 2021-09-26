const connection = require('./connection');

const create = async (name, email, password) => {
  const operation = await connection();
  const { insertedId: _id } = await operation
    .collection('users').insertOne({ name, email, password, role: 'user' });

  return {
    name,
    email,
    _id,
    role: 'user',
  };
};

module.exports = {
  create,
};
