const { Router } = require('express');
const { create, index, show } = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const recipesRouter = Router();

recipesRouter.post('/', auth, create);
recipesRouter.get('/', index);

recipesRouter.get('/:id', show);

module.exports = recipesRouter;