const {
  HTTP_CREATED,
  HTTP_OK_STATUS,
} = require('../../schemas/status');

const {
  createServices,
  readAllServices,
} = require('../../services/recipes/recipesService');

const createController = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.userRecipes;

  const { data } = await createServices(name, ingredients, preparation, userId);

  return res.status(HTTP_CREATED).json({
    recipe: data,
  });
};

const readAllController = async (_req, res) => {
  const { data } = await readAllServices();

  return res.status(HTTP_OK_STATUS).json(data);
};
module.exports = {
  createController,
  readAllController,
};