const service = require('../services/userService');

const createUser = async (req, res) => {
  const { body } = req;

  const newUser = await service.createUser(body);

  if (newUser.err) return res.status(newUser.status).json({ message: newUser.message });

  return res.status(201).json(newUser);
};

const login = async (req, res) => {
  const { body } = req;

  const newLogin = await service.login(body);

  if (newLogin.err) return res.status(newLogin.status).json({ message: newLogin.message });

  return res.status(200).json({ token: newLogin });
};

module.exports = {
  createUser,
  login,
};
