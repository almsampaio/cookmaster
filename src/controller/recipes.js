const services = require('../services/recipes');

const controlCreate = async (req, res) => {
  const { _id: userId } = req.user;
  const infoRecipe = req.body;
  const { status, info, message } = await services.servicesCreate(infoRecipe, userId);
  if (message) { return res.status(status).json({ message }); }
  res.status(status).json({ recipe: info });
};

const controlGetAll = async (_req, res) => {
  const { status, info } = await services.servicesGetAll();
  res.status(status).json(info);
};

const controlGetById = async (req, res) => {
  const { id } = req.params;
  const { status, info, message } = await services.servicesGetById(id);
  if (message) { return res.status(status).json({ message }); }
  res.status(status).json(info);
};

module.exports = {
  controlCreate,
  controlGetAll,
  controlGetById,
};