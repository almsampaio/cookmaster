const express = require('express');
const { createUser, getLogin } = require('../controllers/UserControlers');
const { createRecipe } = require('../controllers/RecipesControlers');
const { validateUserWithToken } = require('../services/auth/validateJwt');

const router = express.Router();

router.post('/users', createUser);
router.post('/login', getLogin);

router.post('/recipes', validateUserWithToken, createRecipe);

module.exports = router;
