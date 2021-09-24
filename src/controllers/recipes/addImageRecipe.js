const rescue = require('express-rescue');

const { StatusCodes: { NOT_FOUND, OK } } = require('http-status-codes');
const multer = require('multer');
const validateJWT = require('../../auth/validateJWT');

const {
  recipesModel,
} = require('../../models');

const storage = require('../../utils/multer');

const upload = multer(storage);

module.exports = [
  validateJWT,
  upload.single('image'),
  rescue(async (req, res) => {
    const { id } = req.params;
    const { path } = req.file;
    try {
      const recipe = await recipesModel.getRecipeById(id);
      // Fonte: PR Luan Ramalho
      res.status(OK).json({ ...recipe, image: `localhost:3000/${path}` });
    } catch (err) {
      res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
  }),
];
