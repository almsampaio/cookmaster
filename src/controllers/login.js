const serviceLogin = require('../services/login');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await serviceLogin.loginUser(email, password);
  return res.status(status).json(data);
};

module.exports = {
  loginUser,
};
