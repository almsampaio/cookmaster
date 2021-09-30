const Recipes = require('../services/Recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const { status, data } = await Recipes.create(name, ingredients, preparation, _id);

  res.status(status).json(data);
};

module.exports = {
  create,
};