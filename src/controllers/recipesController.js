const recipesService = require('../services/recipesService');

async function register(req, res, next) {
  try {
    const recipe = req.body;
    const token = req.headers.authorization;

    const ids = await recipesService.register(recipe, token);

    res.status(201).json({ 
      recipe: {
        ...recipe,
        ...ids,
      },
     });
  } catch (err) {
    next(err);
  }
}

async function getAll(_req, res, next) {
  try {
    const recipes = await recipesService.getAll();

    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getById(id);

    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const recipe = req.body;

    const updatedRecipe = await recipesService.update(id, recipe, token);

    res.status(200).json(updatedRecipe);
  } catch (err) {
    next(err);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    await recipesService.deleteRecipe(id, token);
    
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function uploadFile(req, res, next) {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    const updatedRecipe = await recipesService.uploadFile(id, token);

    res.status(200).json(updatedRecipe);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  getAll,
  getById,
  update,
  deleteRecipe,
  uploadFile,
};
