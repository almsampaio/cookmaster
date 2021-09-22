const userService = require('../services/userService');

async function addUser(req, res) {
  const { name, email, password } = req.body;
  const { code, message, user } = await userService.addUser({ name, email, password });

  if (message) {
    return res.status(code).json({ message });
  }
  res.status(code).json({ user });
}

module.exports = {
  addUser,
};
