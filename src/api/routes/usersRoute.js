const express = require('express');

const router = express.Router();

const { getAll, create, loginUser } = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const { validateJWT } = require('../auth/validateJWT');

router.get('/users', getAll);
router.post('/users', create);
router.post('/login', loginUser);
router.post('/recipes', validateJWT, recipesController.create);
router.get('/recipes', recipesController.getAll);
router.get('/recipes/:id', recipesController.getById);
router.put('/recipes/:id', validateJWT, recipesController.update);

module.exports = router;
