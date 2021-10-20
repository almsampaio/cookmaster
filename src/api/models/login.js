const connection = require('./connect');

const login = async (userData) => {
  const db = await connection();

  const result = await db.collection('users').findOne(userData);

  return result;
};

module.exports = {
  login,
};
