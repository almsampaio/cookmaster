const usersServices = require('../services/usersServices');

const createUser = async (request, response) => {
  const { name, email, password } = request.body;
  
  const createNewUser = await usersServices.createUser(name, email, password);
  return response.status(201).json(createNewUser);
};

module.exports = {
  createUser,
};