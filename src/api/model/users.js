const connection = require('./connection');

const addUser = async (name, password, email, role) => {
  await connection()
    .then((db) => db.collection('users').insertOne({ name, password, email, role }));
  return { name, email, role };
};

const findEmail = async (email) => {
  const value = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return value;
};

module.exports = {
  addUser,
  findEmail,
};
