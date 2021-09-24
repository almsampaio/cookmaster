const express = require('express');

const multer = require('multer');

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
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;    
    callback(null, `${id}.jpg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getAll);

router.get('/:id', findById);

router.put('/:id', userAuthentication, validateUser, update);

router.post('/', userAuthentication, create);

router.post('/:id/image', userAuthentication, validateUser, upload.single('image'), registerImage);

router.delete('/:id', userAuthentication, validateUser, deleteRecipe);

module.exports = router;