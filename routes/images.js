const express = require('express');

const recipesController = require('../controllers/recipesController');

const router = express.Router();

router.get('/:id', recipesController.getImage);

module.exports = router;