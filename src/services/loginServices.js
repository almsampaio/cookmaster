const verifyEmailLogin = require('../auth/verifyEmailLogin');
const verifyPasswordLogin = require('../auth/verifyPasswordLogin');
const generateToken = require('../utils/generateToken');
const { STATUS_OK } = require('../utils/statusSuccess');

const login = async (email, password) => {
  try {
    const resEmail = await verifyEmailLogin(email);
    const resPassword = await verifyPasswordLogin(resEmail, password);
    const token = await generateToken(resPassword);
    return { status: STATUS_OK, message: { token } };
  } catch (err) {
    return err;
  }
};

module.exports = {
  login,
};
