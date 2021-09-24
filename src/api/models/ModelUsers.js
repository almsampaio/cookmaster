const connection = require('./connection');

const create = async ({ name, email, password }) => {
  const role = 'user';
  const connect = await connection();

  const createdUser = await connect.collection('users')
  .insertOne({ name, email, password, role });

  return {
    user: {
      _id: createdUser.insertedId,
      name,
      email,
      role,
    },
  };
};

const getByEmail = async ({ email }) => {
  const connect = await connection();
  const findEmail = await connect.collection('users').findOne({ email });

  return findEmail;
};

module.exports = {
  create,
  getByEmail,
};
