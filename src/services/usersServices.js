const verifyEmail = require('../auth/verifyEmail');
const verifyName = require('../auth/verifyName');
const verifyPassword = require('../auth/verifyPassword');
const { createUser } = require('../models/usersModel');
const { CREATED } = require('../utils/statusSuccess');

const create = async (name, email, password, role) => {
  try {
    const resName = await verifyName(name);
    const resEmail = await verifyEmail(email);
    const resPassword = await verifyPassword(password);
    const createU = await createUser(resName, resEmail, resPassword, role);
    return { status: CREATED, message: createU };
  } catch (err) {
    return err;
  }
};

module.exports = {
  create,
};
