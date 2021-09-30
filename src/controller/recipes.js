const services = require('../services/recipes');

const controlCreate = async (req, res) => {
  const { _id: userId } = req.user;
  const infoRecipe = req.body;
  const { status, info, message } = await services.servicesCreate(infoRecipe, userId);
  if (message) { return res.status(status).json({ message }); }
  res.status(status).json({ recipe: info });
};

module.exports = {
  controlCreate,
};