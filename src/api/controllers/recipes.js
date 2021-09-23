const route = require('express').Router();
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const InvalidEntriesTryAgain = require('../errors/InvalidEntriesTryAgain');
const RecipeNotFound = require('../errors/RecipeNotFound');
const { authenticateJwt } = require('../middlewares/authenticateJwt');
const { isValidObjectId, userOrAdminQuery } = require('../services/helper');
const { getUserIdAuthenticate, getUserRoleAuthenticate } = require('../services/loginService');
const RecipeService = require('../services/recipesService');
const { upload } = require('../services/multerConfig');

route.post('/', authenticateJwt, rescue(async (req, res) => {
  const { error } = RecipeService.recipeSchema.validate(req.body);
  if (error) throw new InvalidEntriesTryAgain();

  const { userId } = getUserIdAuthenticate(req);
  const recipe = await RecipeService.createRecipe({ ...req.body, userId });
  res.status(StatusCodes.CREATED).json({ recipe });
}));

route.put('/:id/image', authenticateJwt, upload.single('image'), rescue(async (req, res) => {
  const { params: { id: recipeId }, file } = req;
  
  if (file.mimetype !== 'image/jpeg') {
    console.log('teste');
    // throw new FileMimetypeInvalid();
  }

  if (!isValidObjectId(recipeId)) throw new RecipeNotFound();

  const { userRole } = getUserRoleAuthenticate(req);
  const { userId } = getUserIdAuthenticate(req);
  
  const recipeWithImage = await RecipeService.updateRecipe(
    userOrAdminQuery(userRole, recipeId, userId),
    { image: `localhost:3000/src/uploads/${file.filename}` },
  );

  if (!recipeWithImage) throw new RecipeNotFound();

  res.status(StatusCodes.OK).json(recipeWithImage);
}));

route.get('/', async (_req, res) => {
  const recipes = await RecipeService.getAllRecipes();
  res.status(StatusCodes.OK).json(recipes);
});

route.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new RecipeNotFound();

  const recipe = await RecipeService.getRecipe(id);
  
  if (!recipe) throw new RecipeNotFound();
  res.status(StatusCodes.OK).json(recipe);
}));

route.put('/:id', authenticateJwt, rescue(async (req, res) => {
  const { body: recipeToEdit, params: { id: recipeId } } = req;
  const { userRole } = getUserRoleAuthenticate(req);
  const { userId } = getUserIdAuthenticate(req);

  if (!isValidObjectId(recipeId)) throw new RecipeNotFound();

  const updateRecipe = await RecipeService
    .updateRecipe(userOrAdminQuery(userRole, recipeId, userId), recipeToEdit);
  
  if (!updateRecipe) throw new RecipeNotFound();

  res.status(StatusCodes.OK).json(updateRecipe);
}));

route.delete('/:id', authenticateJwt, rescue(async (req, res) => {
  const { params: { id: recipeId } } = req;
  const { userRole } = getUserRoleAuthenticate(req);
  const { userId } = getUserIdAuthenticate(req);

  if (!isValidObjectId(recipeId)) throw new RecipeNotFound();

  const deleteRecipe = await RecipeService
    .deleteRecipe(userOrAdminQuery(userRole, recipeId, userId));
  
  if (!deleteRecipe) throw new RecipeNotFound();

  res.status(StatusCodes.NO_CONTENT).json();
}));

route.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(err.statusCode).json(err.err);
});

module.exports = (app) => app.use('/recipes', route);
