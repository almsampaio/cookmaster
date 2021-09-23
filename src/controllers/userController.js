const userService = require('../services/userService');

async function addUser(req, res) {
  const { name, email, password } = req.body;
  const { code, message, user } = await userService.addUser({
    name,
    email,
    password,
    role: 'user',
  });

  if (message) {
    return res.status(code).json({ message });
  }
  res.status(code).json({ user });
}

async function addAdmin(req, res) {
  const { name, email, password } = req.body;
  const { role } = req;

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }

  const { code, message, user } = await userService.addUser({
    name,
    email,
    password,
    role: 'admin',
  });

  if (message) {
    return res.status(code).json({ message });
  }
  res.status(code).json({ user });
}

module.exports = {
  addUser,
  addAdmin,
};
