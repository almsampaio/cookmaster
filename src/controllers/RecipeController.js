const RecipeService = require('../services/RecipeService');

const remove = async (req, res) => {
  const { id } = req.params;

  await RecipeService.remove(id);

  res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { user: { role: roleUSer, _id: idUser } } = req;
  
  const updatedRecipe = await RecipeService.update(id, { name, ingredients, preparation });
  
  if (String(updatedRecipe.userId) !== String(idUser) && roleUSer !== 'admin') {
    return res.status(401).json({ message: 'unauthorized user' });
  }

  res.status(200).json(updatedRecipe);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeService.getById(id);

  console.log(recipe);

  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });

  res.status(200).json(recipe);
};

const getAll = async (_req, res) => {
  const recipes = await RecipeService.getAll();

  res.status(200).json(recipes);
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipeCreated = await RecipeService.create(
    { name, ingredients, preparation }, _id,
);

  if (recipeCreated.message) {
    return res.status(recipeCreated.code)
      .json({ message: recipeCreated.message }); 
  }

  res.status(201).json(recipeCreated);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};