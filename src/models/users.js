const { getConnection } = require('./connection');

const createUser = async ({ name, email, password }) => {
  const role = 'user';
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('users').insertOne({
    name,
    email,
    password,
    role,
  });
  return {
    user: {
      _id,
      name,
      email,
      role,
    },
  };
};

const findUserByEmail = async (email) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
};
