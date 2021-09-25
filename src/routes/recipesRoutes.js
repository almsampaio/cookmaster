const express = require('express');
const multer = require('multer');

const router = express.Router();
const { make } = require('../utils/makeDiskStorage');

const storage = multer.diskStorage(make());
const upload = multer({ storage });
// importar controllers
const { createRecipe, listRecipes,
  recipeDetails, editRecipe,
  deleteRecipe,
  insertImg } = require('../controllers/recipesControllers');
// importar middlewares de validação
const { verifyToken, verifyFields,
  checksPermissions } = require('../middlewares/recipesMiddlewares');

router.post('/', verifyFields, verifyToken, createRecipe);
router.get('/', listRecipes);
router.get('/:id', recipeDetails);
router.put('/:id', verifyToken, checksPermissions, editRecipe);
router.delete('/:id', verifyToken, checksPermissions, deleteRecipe);
router.put('/:id/image/', verifyToken, checksPermissions, upload.single('image'), insertImg);
module.exports = router;