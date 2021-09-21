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

module.exports = {
  createUser,
};
