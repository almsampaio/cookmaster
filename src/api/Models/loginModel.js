const connection = require('./connection');

const checkUserExists = async (email) => {
  const db = await connection();
  const exists = await db.collection('users').findOne({ email });

  return exists;
};

module.exports = {
  checkUserExists,
};