const rescue = require('express-rescue');

const { StatusCodes: { NOT_FOUND, NO_CONTENT } } = require('http-status-codes');
const validateJWT = require('../../auth/validateJWT');

const {
  recipesModel,
} = require('../../models');

module.exports = [
  validateJWT,

  rescue(async (req, res) => {
    const { id } = req.params;

    try {
      const recipe = await recipesModel.deleteRecipe(id);
      res.status(NO_CONTENT).json(recipe);
    } catch (err) {
      res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
  }),
];
