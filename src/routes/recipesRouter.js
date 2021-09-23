const router = require('express').Router();
const recipesController = require('../controllers/recipesController');

// CREATE
router.post('/', recipesController.register);

// READ
router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getById);

// UPDATE
router.put('/:id', recipesController.update);

module.exports = router;
