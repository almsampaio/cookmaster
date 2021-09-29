const router = require('express').Router();
const rescue = require('express-rescue');
const multer = require('multer');
const upload = require('../validation/upload');
const controllerRecipe = require('../controllers/recipes');

router.post('/', rescue(controllerRecipe.create));
router.get('/', rescue(controllerRecipe.find));
router.get('/:id', rescue(controllerRecipe.findById));
router.put('/:id', rescue(controllerRecipe.update));
router.delete('/:id', rescue(controllerRecipe.exclude));
router.put('/:id/image', multer(upload).single('image'), rescue(controllerRecipe.addImage));

module.exports = router;