const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { verify } = require('jsonwebtoken');

const SECRET = 'senhahipermegaultrasecreta';

const recipeJoi = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateRecipe = (req, res, next) => {
  const { error } = recipeJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  try {
    const { _id } = verify(token, SECRET);

    req.user = _id;
  } catch (e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  next();
};

module.exports = {
  validateRecipe, 
  validateToken,
  validateId,
};