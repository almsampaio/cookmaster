const recipesService = require('../services/recipes-services');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  try {
    const recipeData = await recipesService.createRecipe(
      name,
      ingredients,
      preparation,
      _id,
    );

    if (recipeData.message) {
      return res
        .status(recipeData.status)
        .json({ message: recipeData.message }); 
}

    res.status(201).json(recipeData);
  } catch (error) {
    console.error(error);
  }
};

const findRecipes = async (_req, res) => {
  const recipes = await recipesService.findRecipes();

  res.status(200).json(recipes);
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await recipesService.findById(id);
    if (recipe.message) return res.status(recipe.status).json({ message: recipe.message });

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createRecipe, findRecipes, findById };
