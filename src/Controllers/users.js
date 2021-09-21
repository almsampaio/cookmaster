const userService = require('../Services/usersServices');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await userService.registerUser({ name, email, password, role: role || 'user' });
  if (newUser.message) return next(newUser);
  res.status(201).json(newUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);

  if (token.message) return next(token);
  res.status(200).json(token);
};

module.exports = {
  createUser,
  login,
};
