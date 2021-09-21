const models = require('../models/usersModel');

const create = async (user) => {
  await models.create(user);
};

module.exports = {
  create,
};
