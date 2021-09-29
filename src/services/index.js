const models = require('../models');
const schema = require('./JoiSchemas');
const { newError, generateJWT } = require('../utils');

const validateUsersSchema = (userData) => {
  const { error } = schema.user.validate(userData);

  if (error) throw newError(400, 'Invalid entries. Try again.');
};

const validateUniqueEmail = async (email) => {
  const searchResult = await models.searchEmails(email);

  if (searchResult) throw newError(409, 'Email already registered');
};

const registerUser = async (userData) => {
  try {
    validateUsersSchema(userData);
    await validateUniqueEmail(userData.email);

    const userInfo = {
      ...userData,
      role: userData.role || 'user',
    };

    const createdUser = await models.create('users', userInfo);
    const { password, ...infoNoPassword } = createdUser;

    return infoNoPassword;
  } catch (e) {
    throw newError(e.status, e.message);
  }
};

const validateLoginSchema = (loginData) => {
  const { error } = schema.login.validate(loginData);

  if (error) throw newError(401, 'All fields must be filled');
};

const validateLogin = async (userData) => {
  const user = await models.searchEmails(userData.email);
  if (!user) throw newError(401, 'Incorrect username or password');

  console.log(user);

  const passMatch = String(userData.password) === String(user.password);
  if (!passMatch) throw newError(401, 'Incorrect username or password');

  const { name, password, ...tokenPayload } = user;

  return tokenPayload;
};

const logUserIn = async (loginData) => {
  try {
    validateLoginSchema(loginData);
    const loginInfo = await validateLogin(loginData);

    const token = generateJWT(loginInfo);

    return token;
  } catch (e) {
    throw newError(e.status, e.message);
  }
};

module.exports = {
  registerUser,
  logUserIn,
};
