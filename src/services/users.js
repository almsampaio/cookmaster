const modelUsers = require('../models/users');

const create = async (name, email, password) => {
  const [newUser] = await modelUsers.create(name, email, password);

  const { password: _, ...user } = newUser;

  return { status: 201, data: { user } };
};

module.exports = {
  create,
};
