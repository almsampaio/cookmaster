const rescue = require('express-rescue');

const recipesSercice = require('../services/recipesService');
// const userModel = require('../models/usersModel');

const HTTP_CREATED_STATUS = 201;

const create = rescue(async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const { recipe, message, code } = await recipesSercice
  .create(name, ingredients, preparation, _id);
  
  if (message) res.status(code).json({ message });

  res.status(HTTP_CREATED_STATUS).json({ recipe });
});

module.exports = { create };
