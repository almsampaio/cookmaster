const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');

const route = express.Router();

// Lucas Pedroso helped me with the configuration of Multer.
// GitHub: https://github.com/LucasPedroso

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const { validateRecipePayload, validateUserRoleToAddImage } = require('../middlewares/recipes');
const validateToken = require('../middlewares/auth');
const recipesController = require('../controllers/recipes');

route.post('/', validateRecipePayload, validateToken, rescue(recipesController.createRecipe));
route.get('/', rescue(recipesController.getRecipes));
route.get('/:id', rescue(recipesController.getRecipeById));
route.put('/:id', validateRecipePayload, validateToken, rescue(recipesController.updateRecipe));
route.delete('/:id', validateToken, rescue(recipesController.deleteRecipeById));
route.put('/:id/image', validateToken, validateUserRoleToAddImage, upload.single('image'),
  rescue(recipesController.addRecipeImageById));
module.exports = route;