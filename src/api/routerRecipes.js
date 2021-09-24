const express = require('express');
const multer = require('multer');
const RecipesController = require('../Controller/RecipesController');
const recipeValidated = require('../middlewares/recipeValidated');
const validateJWT = require('./auth/validateJWT');

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'src/uploads'); },
  // defini o formato do nome do arquivo
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg') {
      req.fileValidationError = true;
      return cb(null, false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage });

const Recipesrouter = express.Router();

// Requisito 3 - Cadastro de Receitas 
Recipesrouter.post('/', recipeValidated, validateJWT.authJWT, RecipesController.recipeRegistration);
// Requisito 4 - Lista todas as Receitas
Recipesrouter.get('/', RecipesController.listAllReceipes);
// Requisito 5 - Lista uma receita pelo Id
Recipesrouter.get('/:id', RecipesController.listRecipeById);
// Requisito 7 - Edição de uma receita 
Recipesrouter.put('/:id', RecipesController.editRecipe);
// Requisito 8 - Exclui uma receita
Recipesrouter.delete('/:id', RecipesController.deleteRecipe);
// Requisito 9 - Adiciona uma imagem a receita
Recipesrouter.put('/:id/image', upload.single('image'), RecipesController.additionOfImage);

module.exports = { Recipesrouter };
