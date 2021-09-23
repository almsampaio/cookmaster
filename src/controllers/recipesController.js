const service = require('../services/recipeService');

const newRecipe = async (req, res) => {
  const recipe = await service.newRecipe(req.body);

  if (recipe.status) {
    return res.status(recipe.status).json({ message: recipe.message });
  }
  return res.status(201).json({ recipe });
};

const getRecipes = async (_req, res) => {
  const recipe = await service.getRecipes();

  return res.status(200).json(recipe);
};

const getRecipe = async (req, res) => {
  const recipe = await service.getRecipe(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  const { params: { id }, body } = req;

  const recipe = await service.editRecipe(id, body);

  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { params: { id }, body } = req;

  const recipe = await service.deleteRecipe(id, body);

  return res.status(204).json(recipe);
};

const insertImage = async (req, res) => {
  const { file: { filename }, params: { id } } = req;
  const insertedImage = await service.insertImage(filename, id);

  if (!insertImage) {
    return res.status(401).json({ message: 'something went wrong' });
  }

  return res.status(200).json(insertedImage);
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  insertImage,
};
