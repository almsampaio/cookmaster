const express = require('express');

const recipesController = require('../../MSC/receitas/recipesController');

const { controlPostRecipe } = recipesController;

const router = express.Router();

router.post('/', controlPostRecipe);

module.exports = router;
