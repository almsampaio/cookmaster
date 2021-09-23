const router = require('express').Router();
const recipesController = require('../controllers/recipesController');

// CREATE
router.post('/', recipesController.register);

// READ
router.get('/', recipesController.getAll);

module.exports = router;
