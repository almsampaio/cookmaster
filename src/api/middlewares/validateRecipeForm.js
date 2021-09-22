const Joi = require('joi');

const validateRecipeForm = (req, _res, next) => {
  const recipe = req.body;
  const schema = Joi.object({
    name: Joi.string().not().empty().required(),
    ingredients: Joi.string().not().empty().required(),
    preparation: Joi.string().not().empty().required(),
  });

  const validation = schema.validate(recipe);

  if (validation.error) next(validation);

  next();
};

module.exports = { validateRecipeForm };