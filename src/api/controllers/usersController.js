const usersService = require('../services/usersService');

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await usersService.create({ name, email, password });
  // console.log(err);

  if (user.code) return next(user);

  res.status(201).json({ user });
};

module.exports = {
  create,
};