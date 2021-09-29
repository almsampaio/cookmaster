const userModel = require('../models/userModel');

const createUser = async (username, useremail, password) => {
  const { name, email, _id } = await userModel.createUser(username, useremail, password);
  return { status: 201, message: { name, email, role: 'user', _id } };
};

module.exports = { createUser };
