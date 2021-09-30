// Controllers usuário
const userService = require('../Services/userServices');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const { status, message, user } = await userService.create(name, email, password);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ user });
};

module.exports = {
  create,
};