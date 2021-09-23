const { StatusCodes: { BAD_REQUEST, CREATED } } = require('http-status-codes');

const rescue = require('express-rescue');

const {
  recipesModel,
} = require('../../models');

const validateJWT = require('../../auth/validateJWT');

module.exports = [
  validateJWT,
  
  (req, res, next) => {
    const { name, ingredients, preparation } = req.body;

    if (!name || !ingredients || !preparation) {
      return res.status(BAD_REQUEST).json({
        message: 'Invalid entries. Try again.',
      });
    }

    next();
  },

  rescue(async (req, res) => {
    const { user } = req;
    const { name, ingredients, preparation } = req.body;

    const recipeData = {
      user,
      name,
      ingredients,
      preparation,
    };

    const recipe = await recipesModel.addNewRecipe(recipeData);
    res.status(CREATED).json({ recipe });
  }),
];
