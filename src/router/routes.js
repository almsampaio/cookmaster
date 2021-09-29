const express = require('express');
const path = require('path');

const router = express.Router();
const userController = require('../controllers/user-controller');

const login = require('../controllers/login-controller');
const recipes = require('../controllers/recipes-controller');
const istoken = require('../middlewares/authorization');
const { upload } = require('../utils/upload');

router.use('image', express.static(path.join(__dirname, '..', 'uploads')));

router.post('/users', userController.createUser);
router.post('/login', login.loginController);
router.post('/recipes', istoken, recipes.createRecipe);
router.get('/recipes', recipes.findRecipes);
router.get('/recipes/:id', recipes.findById);
router.put('/recipes/:id', istoken, recipes.updateRecipeById);
router.delete('/recipes/:id', istoken, recipes.deleteRecipeById);
router.put(
  '/recipes/:id/image',
  istoken,
  upload.single('image'),
  recipes.uploadImageRecipe,
);

module.exports = router;
