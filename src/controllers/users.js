const usersService = require('../services/users');

const createUser = async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  const newUser = await usersService.createUser(name, email, password, role);
 
  if (newUser.code) return next(newUser);

  return res.status(201).json(newUser);
};

const createAdmin = async (req, res, next) => {
  const { name, email, password, role = 'admin' } = req.body;

  const newUser = await usersService.createUser(name, email, password, role);

  if (newUser.code) return next(newUser);

  return res.status(201).json(newUser);
};

module.exports = {
  createUser,
  createAdmin,
};
