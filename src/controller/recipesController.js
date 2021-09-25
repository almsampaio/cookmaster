const recipesServices = require('../services/recipesServices');
const STATUS = require('../util/myConstants');

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesServices.createRecipe(name, ingredients, preparation);
    return res.status(STATUS.STATUS_201_CREATED).json({ recipe })
  } catch (e) {
    next(e);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const allRecipes = await recipesServices.getAllRecipes();
    return res.status(STATUS.STATUS_200_OK).send(allRecipes)
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

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
};
