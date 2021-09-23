const httpStatus = require('../utils/httpStatus');

const validationError = { message: 'Invalid entries. Try again.' };

const validateIngredients = async (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients === '') {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }

  next();
};

const validatePreparation = async (req, res, next) => {
  const { preparation } = req.body;

  if (!preparation || preparation === '') {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }

  next();
};

module.exports = {
  validateIngredients,
  validatePreparation,
};
