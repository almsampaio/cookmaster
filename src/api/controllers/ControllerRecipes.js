const ServiceRecipes = require('../services/ServiceRecipes');

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const create = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;

    const createdRecipe = await ServiceRecipes.create(token, { name, ingredients, preparation });

    return res.status(CREATED).json(createdRecipe);
  } catch (error) {
    return next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllRecipes = await ServiceRecipes.getAll();

    return res.status(SUCCESS).json(getAllRecipes);    
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findRecipe = await ServiceRecipes.getById(id);

    return res.status(SUCCESS).json(findRecipe);
  } catch (error) {
    return next(error);    
  }
};

const editRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    const { id } = req.params;

    const editedRecipe = await ServiceRecipes
      .editRecipe(id, token, { name, ingredients, preparation });

    return res.status(SUCCESS).json(editedRecipe);
  } catch (error) {
    return next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id } = req.params;

    await ServiceRecipes.deleteRecipe(id, role, userId);

    return res.status(NO_CONTENT).json();
  } catch (error) {
    return next(error);
  }
};

const updateRecipeWithImage = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id } = req.params;

    const updatedRecipe = await ServiceRecipes.updateRecipeWithImage(id, role, userId);

    return res.status(SUCCESS).json(updatedRecipe);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  editRecipe,
  deleteRecipe,
  updateRecipeWithImage,
};
