const express = require('express');
const rescue = require('express-rescue');

const GetAllRecipesController = require('../controllers/recipes/GetAllRecipesController');
const GetRecipeByIdController = require('../controllers/recipes/GetRecipeByIdController');
const RegisterRecipeController = require('../controllers/recipes/RegisterRecipeController');
const UpdateRecipeByIdController = require('../controllers/recipes/UpdateRecipeByIdController');
const DeleteRecipeByIdController = require('../controllers/recipes/DeleteRecipeByIdController');
const InsertImageRecipeController = require('../controllers/recipes/InsertImageRecipeController');

const authPermission = require('../middlewares/authPermission');
const authToken = require('../middlewares/authToken');
const authRecipe = require('../middlewares/recipes/authRecipe');

const upload = require('../multers/recipes/image');

const router = express.Router();

router.post(
  '/',
  rescue(authToken),
  rescue(authRecipe),
  RegisterRecipeController.handle,
);

router.get('/', GetAllRecipesController.handle);

router.get('/:id', rescue(GetRecipeByIdController.handle));

router.put(
  '/:id',
  rescue(authToken),
  rescue(authPermission),
  UpdateRecipeByIdController.handle,
);

router.delete(
  '/:id',
  rescue(authToken),
  rescue(authPermission),
  DeleteRecipeByIdController.handle,
);

router.put(
  '/:id/image',
  upload.single('image'),
  rescue(authToken),
  rescue(authPermission),
  InsertImageRecipeController.handle,
);

module.exports = router;
