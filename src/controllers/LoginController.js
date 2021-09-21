const UserService = require('../services/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.findByCredentials(email, password);

  if (!user.token) return res.status(user.status).json({ message: user.message });

  res.status(user.status).json({ token: user.token });
};

module.exports = {
  login,
};