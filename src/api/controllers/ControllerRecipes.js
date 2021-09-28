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
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getAllRecipes = await ServiceRecipes.getAll();

    return res.status(SUCCESS).json(getAllRecipes);    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
