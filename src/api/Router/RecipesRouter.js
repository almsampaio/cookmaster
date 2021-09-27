const express = require('express');

const recipesController = require('../../MSC/receitas/recipesController');

const { controlPostRecipe } = recipesController;

const TokenValidator = require('../../middlewares/TokenValidator');

const router = express.Router();

router.post('/', TokenValidator, controlPostRecipe);

module.exports = router;
