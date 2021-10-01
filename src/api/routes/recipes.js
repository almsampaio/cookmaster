const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const validateTWD = require('../auth/validateJWT');
const validation = require('../../middlewares/recipes');
const controlRecipes = require('../../controller/recipes');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }, 
});

const upload = multer({ storage });

router.post('/', validateTWD, validation.recipeCreateValidation, controlRecipes.controlCreate);
router.get('/', controlRecipes.controlGetAll);
router.get('/:id', controlRecipes.controlGetById);
router.put('/:id', validateTWD, controlRecipes.controlUpdate);
router.delete('/:id', validateTWD, controlRecipes.controlDelete);
router.put('/:id/image', validateTWD, upload.single('image'), controlRecipes.controlUpload);

module.exports = router;