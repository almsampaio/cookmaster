const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { error, user, token } = await userService.createUser(name, email, password);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
    return res.status(201).json({ user, token });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { error, token } = await userService.userLogin(email, password);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(200).json({ token });
};

module.exports = {
  createUser,
  userLogin,
};
