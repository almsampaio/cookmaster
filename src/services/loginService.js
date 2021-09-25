const userModel = require('../model/usersModel');
const tokenGenerator = require('../util/tokenGeneretor');

const login = async (email) => {
  const user = await userModel.findByEmail(email);
  const id = user._id;
  const data = { email: user.email, userId: id };
  const token = tokenGenerator(data);
  return token;
};

module.exports = {
  login,
};
