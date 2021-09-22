const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const Schema = require('../validations/schemas');
const userModel = require('../models/userModel');

const login = async (req, _res, next) => {
  const { error } = Schema.loginSchema.validate(req.body);
  if (error) next({ message: 'All fields must be filled', statusCode: UNAUTHORIZED });
  const userExists = await userModel.findOnebyEmail(req.body.email);
  if (!userExists) next({ message: 'Incorrect username or password', statusCode: UNAUTHORIZED });
  next();
};

module.exports = login;