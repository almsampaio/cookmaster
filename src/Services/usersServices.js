const { ObjectID } = require('bson');
const userModels = require('../Models/usersModel');

const builtError = (code, message) => ({ code, message });

const registerUser = async (userObj) => {
  const emailExists = await userModels.findByEmail(userObj.email);
  if (emailExists) return builtError(409, 'Email already registred');

  const result = await userModels.registerUser(userObj);
  const { _id: id } = result;
  if (!ObjectID.isValid(id)) return builtError(500, 'Internal error');
  return { user: result };
};

module.exports = {
  registerUser,
  builtError,
};
