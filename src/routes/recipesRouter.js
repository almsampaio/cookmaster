const router = require('express').Router();
const recipesController = require('../controllers/recipesController');

// POST
router.post('/', recipesController.register);

module.exports = router;
