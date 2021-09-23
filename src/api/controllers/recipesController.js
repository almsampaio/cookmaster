const recipesService = require('../services/recipesService');

const register = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
  
    const { message, _id } = await recipesService.register(name, ingredients, preparation);
  
    if (message) return res.status(400).json({ message });
    res.status(201).json({ recipe: { name, ingredients, preparation, userId: user, _id } });
  };

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();

  res.status(200).json(recipes);
};
const getById = async (req, res) => {
  const recipe = await recipesService.getById(req.params.id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' }); 
  
  res.status(200).json(recipe);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  console.log(user);
  const { name, ingredients, preparation } = req.body;

  const recipe = await recipesService.update(name, ingredients, preparation, id);
  const newRecipe = { ...recipe, _id: id, userId: id };
  res.status(200).json(newRecipe);
};

  module.exports = {
    register,
    getAll,
    getById,
    update,
  
}; 