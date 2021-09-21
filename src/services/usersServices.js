const models = require('../models/usersModel');
const util = require('../util/validations');

const create = async (user) => {
  const validatedName = util.checkName(user.name);
  if (validatedName) return validatedName;
  const validatedEmail = util.checkEmail(user.email);
  if (validatedEmail) return validatedEmail;
  const userWithRole = { ...user, role: 'user' };
  const { name, email, role, _id } = await models.create(userWithRole);
  return { user: { name, email, role, _id } };
};

module.exports = {
  create,
};
