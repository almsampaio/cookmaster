const multer = require('multer');
const path = require('path');
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
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipesService.getRecipeById(id);
  if (recipe.error) {
    return res.status(recipe.error.status).json({ message: recipe.error.message });
  }
  const editedRecipe = await recipesService.editRecipe(id, name, ingredients, preparation);

  res.status(200).json(editedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipeById(id);
  if (recipe.error) {
    return res.status(recipe.error.status).json({ message: recipe.error.message });
  }
  await recipesService.deleteRecipe(id);

  res.status(204).json();
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const addImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const recipe = await recipesService.getRecipeById(id);
  res.status(200).json({ ...recipe, image: `localhost:3000/src/uploads/${filename}` });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  upload,
  addImage,
}; 
