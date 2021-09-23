const models = require('../models');
const errorMessage = require('../utils/errorMessages');
const httpStatus = require('../utils/httpStatus');

module.exports = async (req) => {
  const { body, user: { role } } = req;

  if (role !== 'admin') throw errorMessage.ONLY_ADMINS;

  const newBody = { ...body, role };

  const user = await models.createAdmin(newBody);

  return {
    status: httpStatus.CREATED_STATUS,
    user,
  };
};