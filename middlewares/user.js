const {
  StatusCodes: { BAD_REQUEST, CONFLICT },
} = require('http-status-codes');
const Schema = require('../validations/schemas');
const userModel = require('../models/userModel');

const commonUser = async (req, _res, next) => {
  const { error } = Schema.userSchema.validate(req.body);
  if (error) next({ message: 'Invalid entries. Try again.', statusCode: BAD_REQUEST });
  const emailAlreadyExists = await userModel.findOnebyEmail(req.body.email);
  if (emailAlreadyExists) {
    next({ message: 'Email already registered', statusCode: CONFLICT });
  }
  next();
};

module.exports = commonUser;
