const RecipesService = require('../services/Recipes');
const { imageUpload } = require('../multer');

const createNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await RecipesService.createNewRecipe(name, ingredients, preparation);
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(201).json({
    recipe: result,
  });
};

const getAllRecipes = async (req, res) => {
  const result = await RecipesService.getAllRecipes();
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(200).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await RecipesService.getRecipeById({ id });
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(200).json(result);
};

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await RecipesService.updateRecipeById(id, body);
  return res.status(200).json({
  
      _id: id,
      name: body.name,
      ingredients: body.ingredients,
      preparation: body.preparation,
      userId: id,
  });
};

const updateRecipeWithImage = [imageUpload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { path: image } = req.file;
  const recipeWithImage = await RecipesService.updateRecipeWithImage(id, image);
  return res.status(200).json(recipeWithImage);
}];

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await RecipesService.deleteRecipe(id);
  return res.status(204).json(result);
};

 module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipe,
  updateRecipeWithImage,
};