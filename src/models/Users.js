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

const getByEmail = async (email) => {
  const operation = await connection();
  const result = await operation.collection('users').findOne({ email });
  return result;
};

const getAll = async () => {
  const operation = await connection();
  const result = await operation.collection('users').find().toArray();
  return result;
};

module.exports = {
  create,
  getAll,
  getByEmail,
};
