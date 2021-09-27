const usersServices = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = await usersServices.create(name, email, password);
  return res.status(201).json(createUser);
};

module.exports = {
  create,
};
