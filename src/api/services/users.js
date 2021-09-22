const usersModel = require('../models/users');
const { userCreation } = require('../schemas/user');
const CustomError = require('../../lib/CustomError');

module.exports = {
  async create(body) {
    const userSchemaError = userCreation.validate(body).error;
    if (userSchemaError) {
      throw new CustomError(400, 'Invalid entries. Try again.');
    }
    const { name, email, password } = body;
    const userFound = await usersModel.get.byEmail(email);
    if (userFound) {
      throw new CustomError(409, 'Email already registered');
    }
    return usersModel.create({ name, email, password });
  },
};
