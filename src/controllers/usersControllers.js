const { create } = require('../services/usersServices');

const createUser = async (request, response) => {
  const { name, email, password, role = 'user' } = request.body;
  const validyUser = await create(name, email, password, role);

  return response.status(validyUser.status).json(validyUser.message);
};

module.exports = {
  createUser,
};
