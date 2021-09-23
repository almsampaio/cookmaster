const { Router } = require('express');

const {
  readImageController,
} = require('../../controllers/recipes/recipesController');

const router = Router();

router.get('/:id.jpeg', readImageController);

module.exports = router;