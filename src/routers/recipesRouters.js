const express = require('express');

const controllers = require('../controllers/recipesController');

const { userAuthentication } = require('../controllers/loginController');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:id', controllers.findById);

router.put('/:id', controllers.update);

router.post('/', userAuthentication, controllers.create);

router.delete('/:id', controllers.deleteRecipe);

module.exports = router;