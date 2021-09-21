const userModel = require('../models/userModel');

async function addUser(user) {
  const addedUser = await userModel.addUser(user);
  return addedUser;
}

module.exports = {
  addUser,
};
