const recipesServices = require('../Services/recipesServices');

const INTERNAL_SERVER_ERROR = 500;
const INTERNAL_ERROR_MESSAGE = 'Erro interno';

const getAllRecipes = async (_req, res) => {
  try {
    const { code, recipes } = await recipesServices.getAllRecipes();

    return res.status(code).json(recipes);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: INTERNAL_ERROR_MESSAGE, error: err },
    );
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, message, recipe } = await recipesServices.getRecipeById(id);

    return res.status(code).json({ message, ...recipe });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: INTERNAL_ERROR_MESSAGE, error: err },
    );
  }
};

const addRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { code, message, recipe } = await recipesServices.addRecipes(
      name, ingredients, preparation, req.user,
    );

    return res.status(code).json({ message, ...recipe });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: INTERNAL_ERROR_MESSAGE, error: err },
    );
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const userId = req.user;
    const role = req.userRole;
    const { code, message, recipe } = await recipesServices.updateRecipe({
      id, name, ingredients, preparation, userId, role,
    });
    return res.status(code).json({ message, ...recipe });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: INTERNAL_ERROR_MESSAGE, error: err },
    );
  }
};

const updateRecipeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const role = req.userRole;
    const { code, message, recipe } = await recipesServices.updateRecipeImage(id, userId, role);
    return res.status(code).json({ message, ...recipe });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: INTERNAL_ERROR_MESSAGE, error: err },
    );
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const role = req.userRole;

    const { code, message } = await recipesServices.deleteRecipe(id, userId, role);
    return res.status(code).json({ message });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json(
      { message: INTERNAL_ERROR_MESSAGE, error: err },
    );
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipes,
  updateRecipe,
  updateRecipeImage,
  deleteRecipe,
};