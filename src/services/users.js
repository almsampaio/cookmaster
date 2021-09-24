const { Users } = require('../models');
const { UNAUTHORIZED, CONFLICT } = require('../utils/statusCodes');

const validateError = (status, message) => ({
  status,
  message,
});

const getAll = () => {
  console.log('user-service');
  return Users.getAll().then((res) => res);
};

const getByEmail = (email) => Users.getByEmail(email)
  .then((result) => result);

const create = async (name, email, password, role) => {
  const emailIsSingle = await getByEmail(email);
  console.log(emailIsSingle);
  if (emailIsSingle) throw validateError(CONFLICT, 'Email already registered');

  if (!role || role === 'user') {
    return Users
    .create(name, email, password, role || 'user')
    .then((result) => result);
  }
  
  throw validateError(UNAUTHORIZED, 'Invalid role ');
};

module.exports = {
  getAll,
  create,
};