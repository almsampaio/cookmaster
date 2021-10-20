// const UserModel = require('../models/Users');
const RecipeService = require('../services/Recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const { status, json } = await RecipeService
    .create({ name, ingredients, preparation, userId: _id });

  return res.status(status).json(json);
};

module.exports = {
  create,
};
