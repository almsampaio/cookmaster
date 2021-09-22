const rescue = require('express-rescue');

const usersService = require('../services/usersService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getAll = rescue(async (_req, res) => {
  const users = await usersService.getAll();

  res.status(HTTP_OK_STATUS).json({ users });
});

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const { message, code, user } = await usersService.create(name, email, password, role);

  if (message) {
    return res.status(code).json({ message });
  }
  res.status(HTTP_CREATED_STATUS).json({ user });
});

const loginUser = rescue(async (req, res) => {
  const { email, password } = req.body;
  const { message, code, token } = await usersService.loginUser(email, password);

  if (message) {
    return res.status(code).json({ message });
  }
  res.status(HTTP_OK_STATUS).json(token);
});

module.exports = { getAll, create, loginUser };
