const models = require('../models');
const schema = require('./JoiSchemas');
const { newError } = require('../utils');

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
    console.log(e);
    throw newError(e.status, e.message);
  }
};

module.exports = {
  registerUser,
};
