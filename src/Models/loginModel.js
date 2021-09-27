const getConnection = require('./connections');

const findEmailAndPass = async (email, password) => {
  const db = await getConnection();
  const findToLogin = await db.collection('users').findOne({ email, password });
  return findToLogin;
};

module.exports = {
  findEmailAndPass,
};