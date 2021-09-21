const userService = require('../Services/usersServices');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await userService.registerUser({ name, email, password, role: role || 'user' });
  if (newUser.message) return next(newUser);
  res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
