const recipeSchema = require('../../schemas/rescipeSchema');

const authRecipe = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { error } = recipeSchema.validate(
    { name, ingredients, preparation },
    { abortEarly: false },
  );

  if (error) {
    const err = { ...error, code: 400, isJoi: true };

    return next(err);
  }

  next();
};

module.exports = authRecipe;
