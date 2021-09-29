const loginModel = require('../models/loginModel');

const userLogin = async (req, res) => {
  const { email } = req.body;

  const login = await loginModel.userLogin(email);
  return res.status(200).json({ token: login });
};

module.exports = {
  userLogin,
};