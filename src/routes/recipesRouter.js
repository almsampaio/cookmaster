const express = require('express');

const router = express.Router();

const RecipeController = require('../controllers/RecipeController');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.authLogin, RecipeController.create);
router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.getById);
router.put('/:id', authMiddleware.authLogin, RecipeController.update);
router.delete('/:id', authMiddleware.authLogin, RecipeController.remove);

module.exports = router;