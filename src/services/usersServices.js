const models = require('../models/usersModel');

const create = async (user) => {
  const userWithRole = { ...user, role: 'user' };
  const result = await models.create(userWithRole);
  return result;
};

module.exports = {
  create,
};
