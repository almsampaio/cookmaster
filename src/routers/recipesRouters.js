const express = require('express');

const multer = require('multer');

const path = require('path');

const {
  getAll,
  findById,
  create,
  update,
  deleteRecipe,
  validateUser,
  registerImage } = require('../controllers/recipesController');

const { userAuthentication } = require('../controllers/loginController');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    console.log('ENTROU NO MULTER', __dirname);
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;    
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getAll);

router.get('/:id', findById);

router.put('/:id', userAuthentication, validateUser, update);

router.post('/', userAuthentication, create);

router.put('/:id/image/', userAuthentication, validateUser, upload.single('image'), registerImage);

router.delete('/:id', userAuthentication, validateUser, deleteRecipe);

module.exports = router;