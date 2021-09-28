const usersService = require('../services/usersService');

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, result } = await usersService.addUsers(name, email, password);
  return res.status(status).json(result);
};

module.exports = {
  addUsers,
};
