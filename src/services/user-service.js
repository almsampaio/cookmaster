const userModel = require('../models/user-model');

const createUser = async (name, email, password) => {
 const creteadUser = await userModel.createUser(name, email, password);

 return creteadUser;
};

module.exports = {
  createUser,
};
