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

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  try {
    const recipe = await recipesService.updateRecipeById(
      id,
      name,
      ingredients,
      preparation,
    );
    if (recipe.err) {
      return res
        .status(recipe.err.status)
        .json({ message: recipe.err.message });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
  }
};

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;

  await recipesService.deleteRecipeById(id);

  res.status(204).send();
};

const uploadImageRecipe = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;

  // const image = 'localhost:3000/src/uploads/';

  const recipeImg = await recipesService.uploadImageRecipe(id, filename);

  if (recipeImg.err) {
    return res
      .status(recipeImg.err.status)
      .json({ message: recipeImg.err.message });
  }
  res.status(200).json(recipeImg);
};

module.exports = {
  createRecipe,
  findRecipes,
  findById,
  updateRecipeById,
  deleteRecipeById,
  uploadImageRecipe,
};
