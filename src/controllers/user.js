const userService = require('../services/user');

const addProduct = async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = { email, password, name, role };
  const newUser = await userService.addUser(user);

  if (!newUser.error) return res.status(201).json({ user: newUser });
  return res.status(newUser.error).json(newUser);
};

module.exports = {
  addProduct,
};
