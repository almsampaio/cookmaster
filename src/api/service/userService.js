const jwt = require('jsonwebtoken');

const secret = 'secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const userModel = require('../models/userModel');

module.exports = {
  async create(name, email, password, role) {
    const newUser = await userModel.create(name, email, password, role);

    return newUser;
  },

  async login(email, password) {
    const user = await userModel.findByEmail(email);

    if (user && user.password === password) {
      const { _id } = user;
      const token = jwt.sign({ data: user.email, _id, role: user.role }, secret, jwtConfig);

      return token;
    }
  },
};