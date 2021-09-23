const userModel = require('../model/usersModel');
const tokenGenerator = require('../util/tokenGeneretor');

const login = async (email) => {
  const user = await userModel.findByEmail(email);
  const data = { email: user.email, password: user.password };
  const token = tokenGenerator(data)
  return token;
};

module.exports = {
  login,
};
