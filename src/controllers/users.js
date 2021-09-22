const usersService = require('../services/users');
const { successResponses } = require('../utils/httpStatusCodes');

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const existsEmail = await usersService.existsEmail(email);
  if (existsEmail) return next(existsEmail);

  const createdUser = await usersService.createUser(name, email, password);
  return res.status(successResponses.created).json(createdUser);
};

module.exports = { createUser };