const route = require('express').Router();
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const InvalidEntriesTryAgain = require('../errors/InvalidEntriesTryAgain');
const UserService = require('../services/userService');

route.post('/', rescue(async (req, res) => {
  const { error } = UserService.userSchema.validate(req.body);
  if (error) throw new InvalidEntriesTryAgain();

  const user = await UserService.createUser(req.body);
  res.status(StatusCodes.CREATED).json({ user });
}));

route.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(err.statusCode).json(err.err);
});

module.exports = (app) => app.use('/users', route);
