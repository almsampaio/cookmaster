const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../../', 'uploads'));
  },

  filename: (req, file, callback) => {
    const { id } = req.params;
    const filename = `${id}.jpeg`;
    const pathToImage = `localhost:3000/src/uploads/${filename}`;
    req.image = pathToImage;
    callback(null, filename);
  },
});

const upload = multer({ storage });

const { validateJWT, validateRecipeForm, validateUpload } = require('../middlewares');
const recipeController = require('../controllers/recipeController');

router.put('/:id/image/', [
  validateJWT,
  validateUpload,
  upload.single('image'),
  recipeController.uploadImg,
]);

router.post('/', [
  validateRecipeForm,
  validateJWT,
  recipeController.create,
]);

router.put('/:id', [
  validateRecipeForm,
  validateJWT,
  recipeController.update,
]);

router.delete('/:id', [
  validateJWT,
  recipeController.exclude,
]);

router.get('/:id', recipeController.getById);

router.get('/', recipeController.getAll);

router.use((err, _req, res, _next) => {
  if (err.missingToken) return res.status(401).json({ message: 'missing auth token' });

  if (err.error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(401).json({ message: 'jwt malformed' });
}); 

module.exports = router;