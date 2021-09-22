const jwt = require('jsonwebtoken');
const CustomError = require('../../lib/CustomError');
const usersModel = require('../models/users');
const { userLogin } = require('../schemas/user');

const SECRET = '0183rncnm0w02';

module.exports = {
  async login(body) {
    const userSchemaError = userLogin.validate(body).error;
    
    if (userSchemaError) throw new CustomError(401, userSchemaError.message);
    
    const foundUser = await usersModel.get.byEmail(body.email);
    if (!foundUser || body.password !== foundUser.password) {
      throw new CustomError(401, 'Incorrect username or password');
    }

    const { _id: id, email, role } = foundUser;
    const payload = { id, email, role };

    return jwt.sign(payload, SECRET);
  },
};
