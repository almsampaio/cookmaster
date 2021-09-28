const connection = require('./connection');

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const create = async (name, email, password) => {
  const newUser = await connection().then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  }));
  const { password: passBD, ...userWithoutPassword } = newUser.ops[0];

  return userWithoutPassword;
};

const getByEmail = async (email) => {
  const findEmail = await connection().then((db) => db.collection('users').findOne({ email }));

  return findEmail;
};

const userLogin = async (email, password) => {
  const user = await connection().then((db) => db.collection('users').findOne({ email, password }));

  return user;
};

module.exports = {
  create,
  getByEmail,
  userLogin,
};