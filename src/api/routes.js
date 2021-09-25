const express = require('express');
const { login } = require('../controllers/LoginController');
const { createRecipe, getAllRecipes } = require('../controllers/RecipesController');
const { createUser } = require('../controllers/UserController');
const validateLogin = require('../middlewares/validateLogin');
const validateOnCreate = require('../middlewares/validateOnCreate');
const validate = require('../schemas/validate');
const auth = require('../middlewares/auth');

const userRouter = express.Router();
const loginRouter = express.Router();
const recipesRouter = express.Router();

userRouter.route('/')
  .post(validate.createUser(), validateOnCreate, createUser);

loginRouter.route('/')
  .post(validate.login(), validateLogin, login);
  
recipesRouter.route('/')
  .get(getAllRecipes)
  .post(auth, validate.createRecipe(), validateOnCreate, createRecipe);
  
module.exports = { userRouter, loginRouter, recipesRouter };
