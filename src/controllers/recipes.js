const Joi = require('joi');
const recipeModels = require('../models/recipes');

const registerJoi = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().not().empty().required(),
  preparation: Joi.string().not().empty().required(),
});

const registerRecipe = async (req, res, _next) => {
  const { error } = registerJoi.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const result = await recipeModels.registerRecipe(name, ingredients, preparation, _id);
  res.status(201).json(result);
};

module.exports = {
  registerRecipe,
};
