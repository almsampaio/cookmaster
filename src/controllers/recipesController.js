const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');

const service = require('../services/recipesService');

const ERROR_MESSAGE = 'Invalid entries. Try again.';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '/uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id } = req.user;

  const userId = _id;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: ERROR_MESSAGE });
   }

   const createRecipe = await service.create(name, ingredients, preparation, userId);

  res.status(201).json(createRecipe);
});

const getAll = rescue(async (_req, res) => {
  const recipesArray = await service.getAll();

  res.status(200).json(recipesArray);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await service.findById(id);

  if (recipe.err) return res.status(404).json({ message: recipe.err.message });

  res.status(200).json(recipe);
});

const update = rescue(async (req, res) => {
   const { id } = req.params;
   const { _id, role } = req.user;
   const userId = _id;

   if (!req.body.name || !req.body.ingredients || !req.body.preparation) {
    return res.status(400).json({ message: ERROR_MESSAGE });
   }

   const updateProduct = await service.update(id, req.body, role, userId);

   if (updateProduct.err) return res.status(404).json({ message: updateProduct.err.message });

   res.status(200).json(updateProduct);
});

const deleteInfo = rescue(async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  const userId = _id;

  await service.deleteInfo(id, role, userId);

  res.status(204).json();
});

const updateImage = rescue(async (req, res) => {
  const { id } = req.params;
   const { _id, role } = req.user;
   const { filename } = req.file;
   const userId = _id;

   const updateProduct = await service.updateImage(id, filename, role, userId);

   res.status(200).json(updateProduct);
});

module.exports = {
  create,
  getAll,
  findById,
  update,
  deleteInfo,
  upload,
  updateImage,
};
