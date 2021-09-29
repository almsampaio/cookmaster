const ServiceRecipes = require('../services/ServiceRecipes');

const SUCCESS = 200;
const CREATED = 201;

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

module.exports = {
  create,
  getAll,
  getById,
  editRecipe,
};
