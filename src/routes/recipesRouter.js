const router = require('express').Router();
const recipesController = require('../controllers/recipesController');

// CREATE
router.post('/', recipesController.register);

// READ
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);

module.exports = router;
