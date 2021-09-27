const userService = require('../service/userService');

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userService.addUser(name, email, password);

  if (user.message) return res.status(user.status).json({ message: user.message });

  res.status(201).json({ user });
};

const findAll = async (_req, res) => {
  const user = await userService.findAll();

  res.status(200).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.login(email, password);

  if (user.message) return res.status(user.status).json({ message: user.message });

  res.status(200).json({ token: user.token });
};

const addRecipes = async (req, res) => {
  const userId = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await userService.addRecipes(name, ingredients, preparation, userId);

  if (recipe.message) return res.status(recipe.status).json({ message: recipe.message });

  res.status(201).json({ recipe });
};

module.exports = {
  addUser,
  findAll,
  login,
  addRecipes,
};