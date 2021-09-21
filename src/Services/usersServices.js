const userModels = require('../Models/usersModel');

const registerUser = async (userObj) => userModels.registerUser(userObj);

module.exports = {
  registerUser,
};
