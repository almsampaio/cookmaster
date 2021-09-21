const usersModel = require('../Models/usersModels');
const { usersValidations } = require('../helpers/usersValidations');

const HTTP_STATUS_CONFLICT = 409;

const addUsers = async (name, email, password, role = 'user') => {
  const exists = await usersModel.checkEmailExists(email);
  if (exists) {
    return [
      { code: HTTP_STATUS_CONFLICT },
      { message: 'Email already registered' },
    ];
  }

  const validate = usersValidations(name, email, password);

  if (validate) {
    return validate;
  }

  const user = await usersModel.addUsers(name, email, password, role);

  return user;
};

module.exports = {
  addUsers,
};
