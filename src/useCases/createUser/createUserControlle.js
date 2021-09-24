const createUserService = require('./createUserService');

const createUserController = async (request, response) => {
  const { name, email, password } = request.body;

  const createdUser = await createUserService({ name, email, password });
  response.status(201).json({ user: createdUser });
};

module.exports = createUserController;
