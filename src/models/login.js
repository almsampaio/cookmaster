const getConnection = require('./connections');

const { createToken } = require('../middlewares/token');

async function userLogin(email) {
  const db = await getConnection();
  const findEmail = await db.collection('users').findOne({ email });
  const { password, name, ...data } = findEmail;
  const userToken = createToken(data);
  return userToken;
}

module.exports = { userLogin };