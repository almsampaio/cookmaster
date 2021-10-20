const verifyEmail = require('../auth/verifyEmailUsers');
const verifyName = require('../auth/verifyNameUsers');
const verifyPassword = require('../auth/verifyPasswordUsers');
const { createUser } = require('../models/usersModel');
const { CREATED } = require('../utils/statusSuccess');

const create = async (name, email, password, role) => {
  const resName = await verifyName(name);
  const resEmail = await verifyEmail(email);
  const resPassword = await verifyPassword(password);
  const createU = await createUser(resName, resEmail, resPassword, role);
  const response = { user: { ...createU } };
  return { status: CREATED, message: response };
};

module.exports = {
  create,
};
