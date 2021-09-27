const recipesService = require('../services/recipesService');

const createRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const result = await recipesService.createRecipe(name, ingredients, preparation, token);

    return res.status(result.status).json({ recipe: result.message });
  } catch (e) { // apartir de agora começarei a usar o Throw new Error, Obrigado Caputo
    return res.status(e.status).json({ message: e.message });
  }
};

const getRecipes = async (_req, res) => {
  try {
    const response = await recipesService.getRecipes();
    return res.status(response.status).json(response.response);
  } catch (e) {
    return res.status(500).json(e.message);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const response = await recipesService
      .updateRecipe({ id, name, ingredients, preparation, user });
    return res.status(response.status).json(response.response);
  } catch (e) {
    return res.status(e.status).json(e.message);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const response = await recipesService
      .deleteRecipe(id, user);
    return res.status(response.status).end();
  } catch (e) {
    return res.status(e.status).json(e.message);
  }
};

const insertImage = async (req, res) => {
  try {
    console.log(req.file);
    const { id } = req.params;
    const { path } = req.file;
    const { user } = req;
    const response = await recipesService.insertImage(id, path, user);
    res.status(response.status).json(response.response);
  } catch (e) {
    return res.status(e.status).json(e.message);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await recipesService.getRecipeById(id);

    return res.status(response.status).json(response.response);
  } catch (e) {
    return res.status(e.status).json({ message: e.message });
  }
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};
