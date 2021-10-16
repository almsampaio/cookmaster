const connection = require('./index');

const addUser = async (data) => {
  const user = await connection().then((db) =>
  db.collection('users').insertOne(data));
  delete user.ops[0].password;
  return { user: user.ops[0] };
};

const findEmail = async (email) => {
  const user = await connection().then((db) =>
  db.collection('users').findOne({ email }));
  return user;
};

module.exports = { addUser, findEmail }; 