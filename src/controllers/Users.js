const Users = require('../services/Users');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, data, message } = await Users.create(name, email, password);

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json(data);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, message, token } = await Users.login(email, password);

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json({ token });
};

module.exports = {
  create,
  login,
};