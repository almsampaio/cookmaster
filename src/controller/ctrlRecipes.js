const services = require('../servece/servRecipes');

const getOne = async (_req, res) => {
  const { status, response } = await services.getOne();
  return res.status(status).json(response);
};

const creatRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const {
    status,
    response,
  } = await services.createRecipe(authorization, req.body);
  return res.status(status).json(response);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await services.getRecipeById(id);
  return res.status(status).json(response);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { status, response } = await services.edit(id, authorization, req.body);
  return res.status(status).json(response);
};

module.exports = {
  creatRecipe,
  getOne,
  edit,
  getRecipeById,
};
