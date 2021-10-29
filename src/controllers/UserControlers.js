const service = require('../services/UserService');
const model = require('../models/UsersModel');
const { HTTP_CREATED, HTTP_OK } = require('../utils/utils');

const createUser = async (req, res) => {
  const { error, status, message } = await service.createUser(req.body);
  if (error) return res.status(status).json({ message });

  const { name, email, password } = req.body;
  const result = await service.emailExists(email);
  if (result.emailRegister) return res.status(result.status).json({ message: result.message });

  const newUser = await model.createUser(name, email, password);
  const { password: _, ...userData } = newUser;
  return res.status(HTTP_CREATED).json({ user: { ...userData, role: 'user' } });
};

const getLogin = async (req, res) => {
  const { error, status, message } = await service.isLoged(req.body);
  if (error) return res.status(status).json({ message });

  const { email, password } = req.body;

  const isUser = await service.isUser(email, password);
  if (isUser.error) return res.status(isUser.status).json({ message: isUser.message });

  return res.status(HTTP_OK).json({ token: isUser.token });
};

module.exports = {
  createUser,
  getLogin,
};
