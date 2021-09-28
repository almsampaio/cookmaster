const recipesModel = require('../Models/recipesModel');
const recipesService = require('../Services/recipesService');
const { HTTP_CREATED_STATUS } = require('../helpers');

const createdRecipes = async (req, res) => {
 try {
  const { name, ingredients, preparation } = req.body;
  const createRecipe = await recipesModel.createRecipes({ name, ingredients, preparation });
  return res.status(HTTP_CREATED_STATUS).json({ recipe: { ...createRecipe } });
} catch (e) {
  console.log(e);
}
};

const getAllRecipes = async (_req, res) => {
  try {
    const allRecipes = await recipesService.getAllRecipes();
    console.log(allRecipes);
    return res.status(200).json(allRecipes);
  } catch (e) {
    return res.status(500).json({ message: 'Ihhhh deu erro' });
  }
};

module.exports = {
  createdRecipes,
  getAllRecipes,
};
