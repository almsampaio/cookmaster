const recipesServices = require('../services/recipesServices');
const STATUS = require('../util/myConstants');

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req;
    const recipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);
    return res.status(STATUS.STATUS_201_CREATED).json({ recipe });
  } catch (e) {
    next(e);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const allRecipes = await recipesServices.getAllRecipes();
    return res.status(STATUS.STATUS_200_OK).send(allRecipes);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getById(id);
    return res.status(STATUS.STATUS_200_OK).json(...recipe);
  } catch (e) {
    next(e);
  }
};

const recipeUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesServices.recipesUpdate(name, ingredients, preparation, id);
    return res.status(STATUS.STATUS_200_OK).json(...recipe);
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteOne = await recipesServices.deleteById(id);
    return res.status(STATUS.STATUS_204_NO_CONTENT).json(deleteOne);
  } catch (e) {
    next(e);
  }
};

const addImg = async (req, res, next) => {
  try {
    const { params: { id }, file: { filename } } = req;
    const recipe = await recipesServices.addImg(id, filename);
    return res.status(STATUS.STATUS_200_OK).json(...recipe);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  recipeUpdate,
  deleteById,
  addImg,
};
