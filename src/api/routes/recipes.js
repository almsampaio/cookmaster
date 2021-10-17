const { Router } = require('express');
const { create, index, show, update, remove, addImage } = require('../controllers/recipes');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');

const recipesRouter = Router();

recipesRouter.post('/', auth, create);
recipesRouter.get('/', index);
recipesRouter.put('/:id', auth, update);
recipesRouter.delete('/:id', auth, remove);

recipesRouter.put('/:id/image', auth, upload.single('image'), addImage);
recipesRouter.get('/:id', show);

module.exports = recipesRouter;