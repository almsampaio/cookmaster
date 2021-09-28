const Joi = require('joi');

// Ref: https://www.youtube.com/watch?v=u9kxYilQ9l8

const BAD_REQUEST_STATUS = 400;

const recipesSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const recipesValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = { name, ingredients, preparation };

  const { error } = recipesSchema.validate(recipe);

  if (error) {
    return res.status(BAD_REQUEST_STATUS).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  recipesValidation,
};
