const Users = require('../services/UsersService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { message, status, data } = await Users.createUser(name, email, password);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { user } = req;
  const { message, status, data } = await Users.createAdmin(name, email, password, user);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { status, message, token } = await Users.userLogin(email, password);
  if (message) return res.status(status).json({ message });
  res.status(status).json({ token });
};

module.exports = {
  createUser,
  createAdmin,
  userLogin,
};
