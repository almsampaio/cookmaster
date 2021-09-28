const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const recipe = req.body;
  const { user } = req;
  const userId = user._id;

  const { createdRecipe, message, code } = await recipeService.create(recipe, userId);

  if (message) return res.status(code).json({ message });

  return res.status(201).json({recipe: {...createdRecipe, userId: user._id}});
};

const getAll = async (req, res) => {
  const recipes = await recipeService.getAll();
  return res.status(200).json(recipes);
}

const find = async (req, res) => {
  const { id } = req.params;

  const { recipe, code, message } = await recipeService.find(id);

  if (message) return res.status(code).json({message});

  return res.status(200).json(recipe);
}

const edit = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;

  const editedRecipe = await recipeService.edit(recipe, id);
  return res.status(200).json(editedRecipe);
}

const remove = async (req, res) => {
  const { id } = req.params;

  const { message, code } = await recipeService.remove(id);

  if (message) return res.status(code).json({message});

  return res.status(code).json();
}

const addImage = async (req, res) => {
  const { id } = req.params;
  const { path: image } = req.file;

  const { recipe, code } = await recipeService.addImage(id, image);

  return res.status(code).json(recipe);
}

module.exports = {
  create,
  getAll,
  find,
  edit,
  remove,
  addImage,
}
