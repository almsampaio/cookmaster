const express = require('express');
const multer = require('multer');
const { login } = require('../controllers/LoginController');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
} = require('../controllers/RecipesController');
const { createUser } = require('../controllers/UserController');
const validateLogin = require('../middlewares/validateLogin');
const validateOnCreate = require('../middlewares/validateOnCreate');
const validate = require('../schemas/validate');
const auth = require('../middlewares/auth');
const validateUserOnEdit = require('../middlewares/validateUserOnEdit');

const userRouter = express.Router();
const loginRouter = express.Router();
const recipesRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _image, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, image, callback) => {
    const fileExtension = image.mimetype.split('/')[1];
    callback(null, `${req.params.id}.${fileExtension}`);
  },
});

const upload = multer({ storage });

userRouter.route('/').post(validate.createUser(), validateOnCreate, createUser);

loginRouter.route('/').post(validate.login(), validateLogin, login);

recipesRouter
  .route('/')
  .get(getAllRecipes)
  .post(auth, validate.createRecipe(), validateOnCreate, createRecipe);

recipesRouter
  .route('/:id')
  .get(getRecipeById)
  .put(auth, validateUserOnEdit, editRecipe)
  .delete(auth, deleteRecipe);

recipesRouter
  .route('/:id/image')
  .put(auth, validateUserOnEdit, upload.single('image'), uploadImage);

module.exports = { userRouter, loginRouter, recipesRouter };
