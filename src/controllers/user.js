const userService = require('../services/user');

const login = async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await userService.login(email, password);

  if (!userLogin.error) return res.status(200).json({ token: userLogin });
  return res.status(userLogin.error).json(userLogin);
};

const addProduct = async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = { email, password, name, role };
  const newUser = await userService.addUser(user);

  if (!newUser.error) return res.status(201).json({ user: newUser });
  return res.status(newUser.error).json(newUser);
};

module.exports = {
  addProduct,
  login,
};
