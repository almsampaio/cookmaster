const rescue = require('express-rescue');
const { StatusCodes: { BAD_REQUEST, CONFLICT } } = require('http-status-codes');
const { userSchema } = require('../schemas/userSchema');
const userModel = require('../models/usersModel');

const validateUser = rescue(async (req, _res, next) => {
  const { error } = userSchema.validate(req.body);
  
  const { email } = req.body;
  if (error) next({ message: 'Invalid entries. Try again.', statusCode: BAD_REQUEST });

  const emailAlreadyExists = await userModel.findOnebyEmail(email);
  if (emailAlreadyExists) {
    next({ message: 'Email already registered', statusCode: CONFLICT });
  }
  next();
});

module.exports = validateUser;
