const { getConnection } = require('./connection');

const createUser = async (userData) => {
  const db = await getConnection();
  const user = await db
    .collection('users')
    .insertOne(userData)
    .then((result) => {
      const { _id, name, email, role } = result.ops[0];
      return { _id, name, email, role };
    });
  return user;
};

const findUserByEmail = async (email) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });

  return user || null;
};

module.exports = { createUser, findUserByEmail };
