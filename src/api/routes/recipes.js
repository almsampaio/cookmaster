const { Router } = require('express');
const { create, index } = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const recipesRouter = Router();

recipesRouter.post('/', auth, create);
recipesRouter.get('/', index);

module.exports = recipesRouter;