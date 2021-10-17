const { Router } = require('express');
const { create, index, show, update, remove } = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const recipesRouter = Router();

recipesRouter.post('/', auth, create);
recipesRouter.get('/', index);
recipesRouter.put('/:id', auth, update);
recipesRouter.delete('/:id', auth, remove);

recipesRouter.get('/:id', show);

module.exports = recipesRouter;