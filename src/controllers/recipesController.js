const express = require('express');
const multer = require('multer');
/* Sugestão uso de rotas Plantão */
const router = express.Router();
const statusCode = require('http-status-codes');
const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');
const validateToken = require('../middlewares/token');

router.post('/', validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user;
  const recipe = await recipesService.create({ name, ingredients, preparation });
  const { _id } = recipe;

  if (recipe.message === 'Invalid entries. Try again.') {
    return res.status(statusCode.BAD_REQUEST).json(
      { message: recipe.message },
  );
} 
  return res.status(statusCode.CREATED).json({ recipe: 
    { name, ingredients, preparation, userId: id, _id } });
});

router.get('/', async (_req, res) => {
  const listRecipes = await recipesModel.getAll();

  return res.status(statusCode.OK).json(listRecipes);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getId(id);

  if (recipe.message) {
    return res.status(statusCode.NOT_FOUND).json({ message: recipe.message });
  }

  return res.status(statusCode.OK).json(recipe);
});

router.put('/:id', validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { _id } = await recipesModel.getId(id);
  await recipesModel.update({ id, name, ingredients, preparation });

  return res.status(statusCode.OK).json(
    { _id: id, name, ingredients, preparation, userId: _id },
  );
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await recipesModel.exclude(id);

  return res.status(statusCode.NO_CONTENT).json();
});

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.put('/:id/image/', validateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { path: pathFile } = req.file;
    const { _id, name, ingredients, preparation } = await recipesService.getId(id);
    const { _id: userId } = req.user;
    await recipesModel.uploadImage(id, `localhost:3000/${pathFile}`);
      return res.status(200).json(
        { _id, name, ingredients, preparation, userId, image: `localhost:3000/${pathFile}` },
      );
    } catch (error) {
      console.log('message', error.message);
  }
});

module.exports = router; 