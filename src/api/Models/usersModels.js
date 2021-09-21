// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addUsers = async (name, email, password, role) => {
  const db = await connection();
  const user = await db.collection('users').insertOne(
    {
      name,
      email,
      password,
      role,
    },
  );
  return {
    user:
    {
      name,
      email,
      role,
      _id: user.insertedId,
    },
  };
};

const checkEmailExists = async (email) => {
  const db = await connection();
  const exists = await db.collection('users').findOne({ email });

  return exists;
};

module.exports = {
  addUsers,
  checkEmailExists,
};