const modelUsers = require('../models/users');
const validations = require('../schemas/validationsUsers');

const create = async (name, email, password) => {
  const validateName = validations.validateName(name);
  if (validateName) return { status: 400, data: validateName };

  const [newUser] = await modelUsers.create(name, email, password);

  const { password: _, ...user } = newUser;

  return { status: 201, data: { user } };
};

module.exports = {
  create,
};
