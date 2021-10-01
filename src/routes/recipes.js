const router = require('express').Router();
const validateTWD = require('../api/auth/validateJWT');
const validation = require('../middlewares/recipes');
const controlRecipes = require('../controller/recipes');

router.post('/', validateTWD, validation.recipeCreateValidation, controlRecipes.controlCreate);
router.get('/', controlRecipes.controlGetAll);
router.get('/:id', controlRecipes.controlGetById);
// router.put('/:id', productValidation, controller.controllerUpdate);
// router.delete('/:id', controller.controllerDelete);

module.exports = router;