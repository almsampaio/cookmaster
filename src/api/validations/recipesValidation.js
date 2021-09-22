const rescue = require('express-rescue');
const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');
const { recipesSchema } = require('../schemas/recipesSchema');

const validateRecipes = rescue(async (req, _res, next) => {
  const { error } = recipesSchema.validate(req.body);
  
  if (error) next({ message: 'Invalid entries. Try again.', statusCode: BAD_REQUEST });

  next();
});

module.exports = validateRecipes;
