const loginModel = require('./loginModel');
const jwt = require('../../utils/jwt');

const loginService = async ({ email, password }) => {
  const validUser = await loginModel({ email, password });

  if (!validUser) return { err: true };

  const { email: userEmail, role: userRole } = validUser;

  const token = jwt.generateToken({ email: userEmail, role: userRole });
  return { token };
};

module.exports = loginService;
