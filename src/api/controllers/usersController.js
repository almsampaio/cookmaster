const rescue = require('express-rescue');

const usersService = require('../services/usersService');

const create = rescue(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await usersService.create({ name, email, password });

  if (user.code) return next(user);

  res.status(201).json({ user });
});

const userLogin = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const login = await usersService.userLogin({ email, password });

  if (login.code) return next(login);

  res.status(200).json({ token: login });
});

module.exports = {
  create,
  userLogin,
};