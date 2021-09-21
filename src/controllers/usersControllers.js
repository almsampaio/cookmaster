const usersServices = require('../services/usersServices');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const response = await usersServices.create(name, email, password);
  return res.status(response.status).json(response.createdUser);
};

module.exports = {
  create,
};
