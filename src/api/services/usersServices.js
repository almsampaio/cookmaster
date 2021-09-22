const usersModel = require('../model/usersModel');
const { CREATED } = require('../utils/status');

const create = async (user) => {
  const createUser = await usersModel.create(user);
  return {
    status: CREATED,
    message: createUser,
  };
};

module.exports = { create };
