const { Router } = require('express');

const {
  readImageController,
} = require('../controller/recipes');

const router = Router();

router.get('/:id.jpeg', readImageController);

module.exports = router;