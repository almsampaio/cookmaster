const express = require('express');
const recipeController = require('../controllers/recipeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
  .post(authController.verify, recipeController.create)
  .get(recipeController.getAll);

router.route('/:id')
  .get(recipeController.getById)
  .put(authController.verify, recipeController.update);

module.exports = router;
