const { Router } = require('express');
const { create } = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const recipesRouter = Router();

recipesRouter.post('/', auth, create);

module.exports = recipesRouter;