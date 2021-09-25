const usersService = require('../services/usersService');

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, result } = await usersService.addUser(name, email, password);
  return res.status(status).json(result);
};

module.exports = { addUser };
