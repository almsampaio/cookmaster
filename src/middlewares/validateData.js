const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const RECIPE_NOT_FOUND = 'recipe not found';

const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateIdFormat = (req, res, next) => {
  const { _id } = req.params;
  if (!ObjectId.isValid(_id)) {
    return res.status(404).json({ message: RECIPE_NOT_FOUND });
  }
  next();
};

const validateExistingRecipe = async (req, res, next) => {
  const { _id } = req.params;
  const recipe = await recipesModel.getById(_id);
  if (recipe === null) {
    return res.status(404).json({ message: RECIPE_NOT_FOUND });
  }
  next();
};

const validateUserRole = async (req, res, next) => {
  const { userId, role, params: { _id } } = req;
  const recipeToBeUpdated = await recipesModel.getById(_id);
  if (role !== 'admin' && userId !== recipeToBeUpdated.userId) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  next();
};

const validateAdminRole = async (req, res, next) => {
  const { role } = req;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  next();
};

const validateFile = (req, res, next) => {
  const { file } = req;
  if (!file) return res.status(404).json({ message: 'file not found' });
  next();
};

module.exports = {
  validateRecipe,
  validateIdFormat,
  validateExistingRecipe,
  validateUserRole,
  validateFile,
  validateAdminRole,
};
