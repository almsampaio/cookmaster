const recipesService = require('../services/recipesService');
const errorDefault = require('../utils/errorDefault');

async function register(req, res, next) {
  try {
    const recipe = req.body;
    const token = req.headers.authorization;

    const ids = await recipesService.register(recipe, token);

    res.status(201).json({ 
      recipe: {
        ...recipe,
        ...ids,
      },
     });
  } catch (err) {
    const error = errorDefault(err);
    next(error);
  }
}

module.exports = {
  register,
};
