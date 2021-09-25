const UsersService = require('../services/Users');

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await UsersService.createNewUser(name, email, password);
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(201).json({
    user: result,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await UsersService.userLogin(email, password);
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(200).json({
    token: result.token,
  });
};

module.exports = {
  createNewUser,
  userLogin,
};