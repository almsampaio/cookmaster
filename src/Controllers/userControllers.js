// Controllers usuário
const userService = require('../Services/userServices');

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { status, message, user } = await userService.create(name, email, password, role);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ user });
};

module.exports = {
  create,
};