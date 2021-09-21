const Users = require('../services/UsersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { message, status, data } = await Users.createUser(name, email, password);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

module.exports = {
  createUser,
};
