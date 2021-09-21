const usersService = require('../services/users');

const registerUser = async (req, res, next) => {
  const userData = req.body;

  const { result, error } = await usersService.registerUser(userData);

  if (error) return next(error);

  return res.status(201).json({ user: result });
};

module.exports = {
  registerUser,
};
