const recipesService = require('../services/recipes-services');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;

  try {
    const recipeData = await recipesService.createRecipe(
      name,
      ingredients,
      preparation,
      userId,
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

module.exports = { createRecipe, findRecipes };
