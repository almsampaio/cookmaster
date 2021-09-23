const route = require('express').Router();
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const AllFieldsMustBeFilled = require('../errors/AllFieldsMustBeFilled');
const IncorrectUsernameOrPassword = require('../errors/IncorrectUsernameOrPassword');
const LoginService = require('../services/loginService');

route.post('/', rescue(async (req, res) => {
  const { error } = LoginService.loginAllFieldsSchema.validate(req.body);
  if (error) throw new AllFieldsMustBeFilled();

  const { error: err } = LoginService.validEmailSchema.validate(req.body);
  if (err) throw new IncorrectUsernameOrPassword();
  
  const token = await LoginService.authenticate(req.body);
  res.status(StatusCodes.OK).json({ token });
}));

route.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(err.statusCode).json(err.err);
});

module.exports = (app) => app.use('/login', route);
