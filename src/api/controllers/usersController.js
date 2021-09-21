const rescue = require('express-rescue');

const usersService = require('../services/usersService');

const HTTP_OK_STATUS = 200;

const getAll = rescue(async (_req, res) => {
  const users = await usersService.getAll();

  res.status(HTTP_OK_STATUS).json({ users });
});

module.exports = { getAll };
