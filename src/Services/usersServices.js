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

const login = async (email, password) => {
  const valideEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!email || !password) return builtError(401, 'All fields must be filled');
  if (!valideEmail.test(email) || password.length < 8) {
    return builtError(401, 'Incorrect username or password');
  }

  const token = await userModels.login(email, password);
  return token;
};

module.exports = {
  registerUser,
  builtError,
  login,
};
