const userService = require('');

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newUser = await userService.registerUser({ name, email, password, role });
  if (!newUser.name) return next(newUser);
  res.status(201).json(newUser);
};

module.exports = {
  createUser,
};
