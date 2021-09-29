const services = require('../servece/servRecipes');

const getOne = async (_req, res) => {
  const { status, response } = await services.getOne();
  res.status(status).json(response);
};

const creatRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const {
    status,
    response,
  } = await services.createRecipe(authorization, req.body);
  res.status(status).json(response);
};

module.exports = {
  creatRecipe,
  getOne,
};
