const express = require('express');

const router = express.Router();

const { getAll, create, loginUser } = require('../controllers/usersController');
const { create: createRecipe } = require('../controllers/recipesController');
const { validateJWT } = require('../auth/validateJWT');

router.get('/users', getAll);
router.post('/users', create);
router.post('/login', loginUser);
router.post('/recipes', validateJWT, createRecipe);

module.exports = router;
