const recipesServices = require('../../services/recipesServices');
const authErrors = require('../authentication/authErrors');

const { invalid } = authErrors;

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { userInfo } = req;
    const recipeInfo = { id, name, ingredients, preparation };
    const updatedRecipe = await recipesServices.update(recipeInfo, userInfo);
    if (updatedRecipe === null) { throw new Error(invalid.message); }
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return res.status(invalid.code).json({ message: error.message });
  }
};

module.exports = { updateRecipe };
