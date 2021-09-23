const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id } = req.user;

  const userId = _id;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
   }

  const recipe = await recipesService.createRecipe(name, ingredients, preparation, userId);

  res.status(201).json(recipe);
};

const getAllRecipes = async (_req, res) => {
  const recipe = await recipesService.getAllRecipes();

  res.status(200).json(recipe);
};

const getRecipeById = async (req, res) => {
    const { id } = req.params;
  
    const recipe = await recipesService.getRecipeById(id);
    if (recipe.error) {
      return res.status(recipe.error.status).json({ message: recipe.error.message });
    }
  
    res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  console.log('chegou');
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipesService.getRecipeById(id);
  if (recipe.error) {
    return res.status(recipe.error.status).json({ message: recipe.error.message });
  }
  const editedRecipe = await recipesService.editRecipe(id, name, ingredients, preparation);

  res.status(200).json(editedRecipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
}; 
