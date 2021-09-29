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
  const { authorization: token } = req.headers;
  const { status, response } = await services.edit(id, token, req.body);
  return res.status(status).json(response);
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { filename } = req.file;
  const { status, response } = await services.addImage(id, token, filename);
  return res.status(status).json(response);
};

const deleteR = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { status } = await services.deleteR(id, token);
  return res.status(status).json();
};

module.exports = {
  creatRecipe,
  getOne,
  edit,
  getRecipeById,
  addImage,
  deleteR,
};
