const rescue = require('express-rescue');
const httpStatus = require('../utils/httpStatus');
const recipesServices = require('../services/recipesServices');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  console.log(req.user, 'req. user createRecipe controller');
  const { _id: userId } = req.user;
  const recipe = await recipesServices.create(name, ingredients, preparation, userId);

  return res.status(httpStatus.HTTP_CREATE_STATUS).json({ recipe });
});

module.exports = {
  create,
};
