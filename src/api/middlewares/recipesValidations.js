const { ObjectId } = require('mongodb');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/status');

const textsMessages = {
  badReq: { message: 'Invalid entries. Try again.' },
  recipeNotFound: { message: 'recipe not found' },
};

const usersVAlidations = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json(textsMessages.badReq);
  }
  next();
};

const validId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json(textsMessages.recipeNotFound);
  }
  next();
};

module.exports = { usersVAlidations, validId };
