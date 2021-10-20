const { create } = require('../services/usersServices');

const createUser = async (request, response, next) => {
  try {
    const { name, email, password, role = 'user' } = request.body;
    const validyUser = await create(name, email, password, role);

    return response.status(validyUser.status).json(validyUser.message);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
};
