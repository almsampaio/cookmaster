const rescue = require('express-rescue');

const { StatusCodes: { OK, NOT_FOUND } } = require('http-status-codes');
const validateJWT = require('../../auth/validateJWT');

const {
  recipesModel,
} = require('../../models');

module.exports = [
  validateJWT,

  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const newData = { name, ingredients, preparation };

    try {
      const recipe = await recipesModel.updateRecipe(id, newData);
      res.status(OK).json(recipe);
    } catch (err) {
      res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
  }),
];
