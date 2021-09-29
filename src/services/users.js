const users = require('../models/users');
const valid = require('../validation/users');
// const { verifyToken } = require('../validation/token');

const create = async (user) => {
  await valid.user(user);
  const newUser = user;
  newUser.role = 'user';
  const result = await users.create(newUser);
  return result;
};

module.exports = {
  create,
};