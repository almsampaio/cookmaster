const userModel = require('../models/userModel');

module.exports = {
  async create(name, email, password, role) {
    const newUser = await userModel.create(name, email, password, role);

    return newUser;
  },
};