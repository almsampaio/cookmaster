const connection = require('./connection');

const createToken = require('../middlewares/token');

const userLogin = async (email) => {
  const db = await connection();

  const searchByEmail = await db.collection('users').findOne({ email });

  const { password, name, ...dataWithoutPassword } = searchByEmail;
  const userToken = createToken.token(dataWithoutPassword);
  return userToken;
};

module.exports = {
  userLogin,
};
