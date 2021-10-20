const verifyCorrectLogin = require('../auth/verifyCorrectLogin');
const verifyEmptyLogin = require('../auth/verifyEmptyLogin');
const generateToken = require('../utils/generateToken');
const { STATUS_OK } = require('../utils/statusSuccess');

const login = async (email, password) => {
  const verifyEmpty = await verifyEmptyLogin(email, password);
  const validateLogin = await verifyCorrectLogin(verifyEmpty);
  const token = await generateToken(validateLogin);
  return { status: STATUS_OK, message: { token } };
};

module.exports = {
  login,
};
