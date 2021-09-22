const { conn } = require('./conn');

const COLLECTION = 'users';

const create = async ({ name, email, password }) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const { insertedId: _id } = await dbConn.insertOne({ name, email, password });

  return {
    user: {
      name,
      email,
      role: 'user',
      _id,
    },
  };
};

const getByEmail = async (email) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const emailValidate = await dbConn.findOne({ email });
  return emailValidate;
};

module.exports = { create, getByEmail };