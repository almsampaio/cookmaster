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

const findAllRecipes = async (_req, res) => {
  const recipes = await userService.findAllRecipes();

  res.status(200).json(recipes);
};

const findByIdRecipes = async (req, res) => {
  const { id } = req.params;
  const recipe = await userService.findByIdRecipes(id);
  if (recipe.message) return res.status(recipe.status).json({ message: recipe.message });

  res.status(200).json(recipe);
};

const upDateRecipes = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  console.log(req.user);
  const { status, data, err } = await userService.upDateRecipes(id, req.body, _id);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

const excludeRecipes = async (req, res) => {
  const { id } = req.params;

  const result = await userService.upDateRecipes(id);

  if (result.message) return res.status(result.status).json({ message: result.message });

  res.status(204).send();
};

const upLoadFile = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const recipe = await userService.upLoadFile(id, filename);
  if (recipe.message) return res.status(recipe.status).json({ message: recipe.message });

  res.status(200).json(recipe);
};

module.exports = {
  addUser,
  findAll,
  login,
  addRecipes,
  findAllRecipes,
  findByIdRecipes,
  upDateRecipes,
  excludeRecipes,
  upLoadFile,
};