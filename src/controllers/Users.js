const Users = require('../services/Users');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, data, message } = await Users.create(name, email, password);

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json(data);
};

module.exports = {
  create,
};