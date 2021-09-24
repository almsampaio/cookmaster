const rescue = require('express-rescue');

const { StatusCodes: { BAD_REQUEST, OK, NOT_FOUND } } = require('http-status-codes');

const {
  recipesModel,
} = require('../../models');

module.exports = [
  (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return res.status(BAD_REQUEST)
        .json({ message: 'recipe not found' });
    } 

    next();
  },

  rescue(async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await recipesModel.getRecipeById(id);
      res.status(OK).json(recipe);
    } catch (err) {
      res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
  }),
];
