const model = require('../models/Recipes');
const isValid = require('../services/auth/Validated');
const { BAD_REQUEST, CREATED } = require('./Status');

const createRecipes = async (req, res) => {
  try {
    const { error } = isValid.recipesValid(req.body);
    if (error) return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });

    const userID = req.user;
    const { name, ingredients, preparation } = req.body;

    const recipe = await model.addRecipe(name, ingredients, preparation, userID);

    res.status(CREATED).json({ recipe });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = {
  createRecipes,
};
