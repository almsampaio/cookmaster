const userService = require('../services/users');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await userService.createUser(name, email, password);
  if (newUser.errorCode) return res.status(newUser.errorCode).json(newUser.errorInfo);

  return res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const login = await userService.loginUser(email, password);
  if (login.errorCode) return res.status(login.errorCode).json(login.errorInfo);
  return res.status(login.code).json(login.tokenInfo);
};

module.exports = {
  createUser,
  loginUser,
};