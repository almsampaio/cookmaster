const { Router } = require('express');

const multer = require('multer');

const router = Router();

const validateJWT = require('../auth/validateJWT');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, __dirname);
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const {
  getAllRecipes,
  getRecipeById,
  addRecipes,
  updateRecipeImage,
  updateRecipe,
  deleteRecipe,
} = require('../Controllers/recipesController');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', validateJWT, addRecipes);
router.put('/:id/image/', upload.single('image'), validateJWT, updateRecipeImage);
router.put('/:id', validateJWT, updateRecipe);
router.delete('/:id', validateJWT, deleteRecipe);

module.exports = router;