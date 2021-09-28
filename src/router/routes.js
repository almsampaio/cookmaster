const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');

const login = require('../controllers/login-controller');
const recipes = require('../controllers/recipes-controller');
const istoken = require('../middlewares/authorization');

router.post('/users', userController.createUser);
router.post('/login', login.loginController);
router.post('/recipes', istoken, recipes.createRecipe);
router.get('/recipes', recipes.findRecipes);
router.get('/recipes/:id', recipes.findById);
router.put('/recipes/:id', istoken, recipes.updateRecipeById);
router.delete('/recipes/:id', istoken, recipes.deleteRecipeById);

module.exports = router;
