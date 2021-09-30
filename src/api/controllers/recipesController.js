const multer = require('multer');

const service = require('../services/recipesService');

const status = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

const createRecipes = async (req, res) => {
  const { body, headers: { authorization } } = req;
  const newUser = await service.createRecipes(body, authorization);
  if (newUser.err) {
    return res.status(status[newUser.err.code]).json({ message: newUser.err.message });
  }
  return res.status(status.CREATED).json(newUser);
};

const getRecipes = async (_req, res) => {
  const recipes = await service.getRecipes();

  return res.status(status.OK).json(recipes);
};

const getRecipeByID = async (req, res) => {
  const { params: { id } } = req;
  const recipeByID = await service.getRecipeByID(id);
  if (recipeByID.err) {
    return res.status(status[recipeByID.err.code]).json({ message: recipeByID.err.message });
  }
  return res.status(status.OK).json(recipeByID);
};

const updateRecipeByID = async (req, res) => {
  const { body, headers: { authorization }, params: { id } } = req;
  const updatedUser = await service.updateRecipeByID(body, authorization, id);
  if (updatedUser.err) {
    return res.status(status[updatedUser.err.code]).json({ message: updatedUser.err.message });
  }
  return res.status(status.OK).json(updatedUser);
};

const deleteRecipeByID = async (req, res) => {
  const { headers: { authorization }, params: { id } } = req;
  const deletedUser = await service.deleteRecipeByID(authorization, id);
  if (deletedUser.err) {
    return res.status(status[deletedUser.err.code]).json({ message: deletedUser.err.message });
  }
  return res.status(status.NO_CONTENT).json();
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const insertImageInRecipeByID = async (req, res) => {
  const { headers: { authorization }, params: { id }, file: { path } } = req;
  const recipeWithInsertedImage = await service.insertImageInRecipeByID(authorization, id, path);
  if (recipeWithInsertedImage.err) {
    return res.status(status[recipeWithInsertedImage.err.code])
      .json({ message: recipeWithInsertedImage.err.message });
  }
  return res.status(status.OK).json(recipeWithInsertedImage);
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipeByID,
  updateRecipeByID,
  deleteRecipeByID,
  upload,
  insertImageInRecipeByID,
};
