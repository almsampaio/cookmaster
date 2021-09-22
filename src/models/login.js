const connection = require('./connection');

const existsLogin = async (email, password) => {
  const db = await connection();
  const isValidLogin = await db.collection('users').findOne({ email, password });
  return isValidLogin;
};

module.exports = { existsLogin };