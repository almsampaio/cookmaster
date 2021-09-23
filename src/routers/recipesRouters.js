const express = require('express');

const controller = require('../controllers/recipesController');

const { userAuthentication } = require('../controllers/loginController');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.findById);

router.put('/:id', userAuthentication, controller.update);

router.post('/', userAuthentication, controller.create);

router.delete('/:id', userAuthentication, controller.deleteRecipe);

module.exports = router;