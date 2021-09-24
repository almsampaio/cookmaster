const rescue = require('express-rescue');
const serviceUsers = require('../service/users');

const addUser = rescue(
  async (req, res) => {
    const { name, password, email } = req.body;
    const value = await serviceUsers.addUser(name, password, email);

    return res.status(201).json({ user: value });
  },
);

const findUser = rescue(
  async (req, res) => {
    const { email, password } = req.body;
    const token = await serviceUsers.findUser(email, password);

    return res.status(200).json({ token });
  },
);

const addRecipes = rescue(
  async (req, res) => {
    const { authorization } = req.headers;
    const recipe = await serviceUsers.addRecipes(req.body, authorization);

    return res.status(201).json({ recipe });
  },
);

const getRecipes = rescue(
  async (_req, res) => {
    const recipes = await serviceUsers.getRecipes();

    return res.status(200).json(recipes);
  },
);

const getRecipe = rescue(
  async (req, res) => {
    const { id } = req.params;
    const recipe = await serviceUsers.getRecipe(id);

    return res.status(200).json(recipe);
  },
);

const updateRecipe = rescue(
  async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const newrecipe = await serviceUsers.updateRecipe(id, authorization, req.body);

    return res.status(200).json(newrecipe);
  },
);

const deleteRecipe = rescue(
  async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    await serviceUsers.deleteRecipe(id, authorization);

    return res.status(204).json();
  },
);

const addImage = rescue(
  async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;

    const newRecipe = await serviceUsers.addImage(id, authorization);

    return res.status(200).json(newRecipe);
  },
);

module.exports = {
  addUser,
  findUser,
  addRecipes,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
};
