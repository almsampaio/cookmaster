const getConnection = require('./connections');

const { createToken } = require('../middlewares/token');

async function userLogin(email) {
  const db = await getConnection();
  const findEmail = await db.collection('users').findOne({ email });
  const { token } = createToken(findEmail);
  return token;
}

module.exports = { userLogin };